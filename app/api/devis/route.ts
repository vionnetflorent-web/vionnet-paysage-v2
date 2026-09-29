import { NextResponse } from "next/server";
import { projectTypes, siteConfig } from "@/lib/content";

/**
 * Réception des demandes de devis (formulaire components/QuoteForm.tsx).
 *
 * 1. Filtre anti-spam (champ piège + délai minimal de remplissage).
 * 2. Revalidation côté serveur.
 * 3. Envoi par email via l'API Resend — appel HTTP direct, AUCUNE
 *    dépendance à installer.
 *
 * Configuration (Vercel → Settings → Environment Variables) :
 *   RESEND_API_KEY   obligatoire  clé API Resend (re_…)
 *   QUOTE_FROM       facultatif   expéditeur, ex. "Site Vionnet <site@vionnetpaysage.com>"
 *                                 (domaine à valider dans Resend). Par défaut,
 *                                 l'adresse de test Resend est utilisée.
 *   QUOTE_TO         facultatif   destinataire, par défaut siteConfig.email
 *
 * Si la clé est absente, la route renvoie une erreur : le formulaire
 * affiche alors l'adresse email en secours. Aucune demande n'est perdue
 * en silence.
 */

export const runtime = "nodejs";

const MAX_FILES = 5;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
// Resend limite le poids total d'un email à 40 Mo.
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const value = (key: string) => String(form.get(key) ?? "").trim();

  // ── Anti-spam ──────────────────────────────────────────────────────────
  // Réponse volontairement neutre : inutile d'informer le robot.
  if (value("societe_web") !== "") return NextResponse.json({ ok: true });
  const elapsed = Number(form.get("elapsed") ?? 0);
  if (Number.isFinite(elapsed) && elapsed > 0 && elapsed < 2000) {
    return NextResponse.json({ ok: true });
  }

  // ── Validation ─────────────────────────────────────────────────────────
  const payload = {
    prenom: value("prenom").slice(0, 80),
    nom: value("nom").slice(0, 80),
    email: value("email").slice(0, 160),
    telephone: value("telephone").slice(0, 30),
    commune: value("commune").slice(0, 80),
    type: value("type"),
    budget: value("budget").slice(0, 60),
    message: value("message").slice(0, 5000),
  };

  const errors: Record<string, string> = {};
  if (payload.prenom.length < 2) errors.prenom = "Prénom requis.";
  if (payload.nom.length < 2) errors.nom = "Nom requis.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email))
    errors.email = "Email invalide.";
  if (payload.telephone.replace(/[^0-9+]/g, "").length < 9)
    errors.telephone = "Téléphone invalide.";
  if (payload.message.length < 10) errors.message = "Message trop court.";
  if (payload.type && !projectTypes.includes(payload.type))
    errors.type = "Type de projet inconnu.";

  const photos = form
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (photos.length > MAX_FILES) errors.photos = "Trop de fichiers.";
  if (photos.some((f) => f.size > MAX_FILE_BYTES))
    errors.photos = "Fichier trop volumineux.";
  if (photos.reduce((sum, f) => sum + f.size, 0) > MAX_TOTAL_BYTES)
    errors.photos = "Poids total des photos trop élevé.";
  if (photos.some((f) => !f.type.startsWith("image/")))
    errors.photos = "Seules les images sont acceptées.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // ── Envoi ──────────────────────────────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[devis] RESEND_API_KEY manquante : la demande n'a pas pu être transmise.",
      { email: payload.email, nom: payload.nom }
    );
    return NextResponse.json(
      { error: "Envoi indisponible pour le moment." },
      { status: 503 }
    );
  }

  const rows: [string, string][] = [
    ["Nom", `${payload.prenom} ${payload.nom}`],
    ["Téléphone", payload.telephone],
    ["Email", payload.email],
    ["Commune", payload.commune || "—"],
    ["Type de projet", payload.type || "—"],
    ["Budget indicatif", payload.budget || "—"],
    ["Photos jointes", String(photos.length)],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#1a1c17;line-height:1.6">
      <h2 style="font-weight:normal;margin:0 0 16px">Nouvelle demande de devis</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="color:#6b6e66;padding-right:16px">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`
          )
          .join("")}
      </table>
      <h3 style="font-weight:normal;margin:24px 0 8px">Message</h3>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(payload.message)}</p>
      <p style="color:#6b6e66;font-size:13px;margin-top:32px">
        Répondez directement à cet email pour écrire au client.
      </p>
    </div>`;

  const text = [
    "Nouvelle demande de devis",
    "",
    ...rows.map(([k, v]) => `${k} : ${v}`),
    "",
    "Message :",
    payload.message,
  ].join("\n");

  const attachments = await Promise.all(
    photos.map(async (f, i) => ({
      filename: f.name || `photo-${i + 1}.jpg`,
      content: Buffer.from(await f.arrayBuffer()).toString("base64"),
    }))
  );

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.QUOTE_FROM || "Site Vionnet Paysage <onboarding@resend.dev>",
        to: [process.env.QUOTE_TO || siteConfig.email],
        // « Répondre » dans votre messagerie écrit directement au client.
        reply_to: payload.email,
        subject: `Devis — ${payload.prenom} ${payload.nom}${payload.commune ? ` (${payload.commune})` : ""}`,
        html,
        text,
        ...(attachments.length > 0 ? { attachments } : {}),
      }),
    });

    if (!res.ok) {
      console.error("[devis] Resend a refusé l'envoi", res.status, await res.text());
      return NextResponse.json({ error: "Échec de l'envoi." }, { status: 502 });
    }
  } catch (err) {
    console.error("[devis] Erreur réseau vers Resend", err);
    return NextResponse.json({ error: "Échec de l'envoi." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
