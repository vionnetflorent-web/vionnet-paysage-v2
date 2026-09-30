"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";

/**
 * Apparition progressive au scroll — IntersectionObserver natif, aucune
 * dépendance d'animation. L'élément monte de quelques pixels en fondu,
 * une seule fois. Les préférences « mouvement réduit » sont respectées
 * côté CSS (voir app/globals.css).
 */
export default function Reveal({
  children,
  delay = 0,
  as = "div",
  className = "",
}: {
  children: React.ReactNode;
  /** Décalage en ms, pour échelonner plusieurs éléments d'une même grille. */
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "figure";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Si l'API n'est pas disponible, on affiche directement le contenu.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return React.createElement(
    as,
    {
      ref,
      className: `reveal ${className}`,
      "data-visible": visible ? "true" : "false",
      style: { "--reveal-delay": `${delay}ms` } as React.CSSProperties,
    },
    children
  );
}
