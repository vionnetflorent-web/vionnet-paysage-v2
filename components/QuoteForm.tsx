"use client";

import { useRef, useState } from "react";
import { budgetRanges, projectTypes, siteConfig } from "@/lib/content";

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const MAX_FILES = 5;
const MAX_FILE_MB = 5;

const fieldBase =
  "w-full rounded-[2px] border border-line bg-white px-4 py-3.5 text-[15px] text-ink outline-none transition-colors duration-300 placeholder:text-mute/70 focus:border-accent";

/**
 * Formulaire de demande de devis.
 *
 * - Validation côté client ET côté serveur (voir app/api/devis/route.ts).
 * - Anti-spam sans dépendance : champ piège (honeypot) + délai minimal
 *   de remplissage. Aucun captcha tiers, aucun script externe.
 * - Accessibilité : labels explicites, aria-invalid, messages d'erreur
 *   liés aux champs, statut annoncé via aria-live.
 */
export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [fileNote, setFileNote] = useState<string | null>(null);
  const startedAt = useRef<number>(Date.now());

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const nom = String(data.get("nom") ?? "").trim();
    const prenom = String(data.get("prenom") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const telephone = String(data.get("telephone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (nom.length < 2) next.nom = "Merci d'indiquer votre nom.";
    if (prenom.length < 2) next.prenom = "Merci d'indiquer votre prénom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = "Adresse email invalide.";
    if (telephone.replace(/[^0-9+]/g, "").length < 9)
      next.telephone = "Numéro de téléphone invalide.";
    if (message.length < 10)
      next.message = "Décrivez votre projet en quelques mots (10 caractères minimum).";

    const files = data.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
    if (files.length > MAX_FILES) next.photos = `${MAX_FILES} photos maximum.`;
    if (files.some((f) => f.size > MAX_FILE_MB * 1024 * 1024))
      next.photos = `Chaque photo doit peser moins de ${MAX_FILE_MB} Mo.`;

    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Place le focus sur le premier champ en erreur.
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    // Anti-spam : les robots remplissent le champ piège et soumettent
    // quasi instantanément.
    data.set("elapsed", String(Date.now() - startedAt.current));

    setStatus("sending");
    try {
      const res = await fetch("/api/devis", { method: "POST", body: data });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
      form.reset();
      setFileNote(null);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="border border-line bg-white p-8 sm:p-10"
      >
        <p className="font-display text-[26px] leading-[1.25] text-ink sm:text-[30px]">
          Votre demande est bien arrivée.
        </p>
        <p className="mt-4 text-[16px] leading-[1.8] text-graphite">
          Nous revenons vers vous rapidement pour convenir d&apos;une visite du
          terrain. Pour toute précision d&apos;ici là :{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="border-b border-ink/30 text-ink transition-colors hover:border-ink"
          >
            {siteConfig.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-[12px] uppercase tracking-[0.16em] text-graphite underline decoration-line underline-offset-4 transition-colors hover:text-ink"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Champ piège — invisible pour l'utilisateur, ignoré des lecteurs d'écran */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="societe_web">Ne pas remplir</label>
        <input id="societe_web" name="societe_web" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Prénom" name="prenom" error={errors.prenom} required autoComplete="given-name" />
        <Field label="Nom" name="nom" error={errors.nom} required autoComplete="family-name" />
        <Field
          label="Téléphone"
          name="telephone"
          type="tel"
          error={errors.telephone}
          required
          autoComplete="tel"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          error={errors.email}
          required
          autoComplete="email"
        />
        <Field label="Commune" name="commune" autoComplete="address-level2" />

        <div>
          <Label htmlFor="type">Type de projet</Label>
          <select id="type" name="type" defaultValue={projectTypes[0]} className={fieldBase}>
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="budget">Budget indicatif</Label>
          <select
            id="budget"
            name="budget"
            defaultValue={budgetRanges[budgetRanges.length - 1]}
            className={fieldBase}
          >
            {budgetRanges.map((range) => (
              <option key={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="message" required>
          Votre projet
        </Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="Surface concernée, état actuel du terrain, travaux envisagés, échéance souhaitée…"
          className={`${fieldBase} resize-y`}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      <div>
        <Label htmlFor="photos">Photos du terrain (optionnel)</Label>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const count = e.currentTarget.files?.length ?? 0;
            setFileNote(count > 0 ? `${count} fichier(s) sélectionné(s)` : null);
          }}
          aria-describedby="photos-hint"
          className="w-full rounded-[2px] border border-dashed border-line bg-white px-4 py-3.5 text-[14px] text-graphite file:mr-4 file:rounded-[2px] file:border-0 file:bg-cream file:px-4 file:py-2 file:text-[13px] file:text-ink"
        />
        <p id="photos-hint" className="mt-2 text-[13px] text-mute">
          {fileNote ?? `${MAX_FILES} photos maximum, ${MAX_FILE_MB} Mo par fichier.`}
        </p>
        <FieldError id="photos-error" message={errors.photos} />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[2px] bg-forest px-8 text-[12px] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-500 ease-premium hover:bg-moss disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
        </button>

        <p aria-live="polite" className="mt-4 min-h-[20px] text-[14px]">
          {status === "error" && (
            <span className="text-[#a33]">
              L&apos;envoi a échoué. Réessayez ou écrivez-nous à {siteConfig.email}.
            </span>
          )}
        </p>

        <p className="mt-2 text-[13px] leading-[1.7] text-mute">
          Les informations transmises servent uniquement à répondre à votre
          demande. Voir notre{" "}
          <a
            href="/politique-confidentialite"
            className="border-b border-mute/50 transition-colors hover:text-ink"
          >
            politique de confidentialité
          </a>
          .
        </p>
      </div>
    </form>
  );
}

/* ── Sous-composants de formulaire ─────────────────────────────────────── */

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-mute"
    >
      {children}
      {required && <span aria-hidden> *</span>}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-[13px] text-[#a33]">
      {message}
    </p>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={fieldBase}
      />
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}
