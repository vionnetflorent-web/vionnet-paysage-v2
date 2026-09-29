import type { Config } from "tailwindcss";

// Design tokens Vionnet Paysage.
// Palette volontairement restreinte : blanc cassé, crème, noir doux,
// verts profonds. L'accent (vert du logo) est utilisé avec parcimonie.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f7f6f2", // blanc cassé
        cream: "#efece4", // crème très léger
        ink: "#1a1c17", // noir doux
        graphite: "#4d5049", // texte courant
        mute: "#6b6e66", // texte secondaire
        forest: "#4e7050", // vert profond (fonds sombres)
        moss: "#5f8261", // vert naturel
        accent: "#4a6b58", // accent logo, usage très discret
        line: "#e2ded4", // filets
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.32em",
        wordmark: "0.15em",
      },
      maxWidth: {
        content: "1240px",
        prose: "660px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
