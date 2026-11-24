import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        sand: "var(--color-sand)",
        forest: {
          DEFAULT: "var(--color-forest)",
          light: "var(--color-forest-light)",
          hover: "var(--color-forest-hover)",
        },
        terracotta: {
          DEFAULT: "var(--color-terracotta)",
          hover: "var(--color-terracotta-hover)",
          contrast: "var(--color-terracotta-contrast)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          light: "var(--color-ink-light)",
        },
        muted: "var(--color-muted)",
        line: "var(--color-line)",
      },
      fontFamily: {
        fraunces: ["var(--font-fraunces)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        input: "10px",
        card: "18px",
        full: "9999px",
      },
      fontSize: {
        "scale-12": ["0.75rem", { lineHeight: "1.2" }],
        "scale-14": ["0.875rem", { lineHeight: "1.3" }],
        "scale-16": ["1rem", { lineHeight: "1.5" }],
        "scale-20": ["1.25rem", { lineHeight: "1.35" }],
        "scale-28": ["1.75rem", { lineHeight: "1.2" }],
        "scale-40": ["2.5rem", { lineHeight: "1.1" }],
        "scale-64": ["4rem", { lineHeight: "1.05" }],
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 20px 40px -15px rgba(31, 61, 43, 0.15)",
        floating: "0 25px 50px -12px rgba(0, 0, 0, 0.18)",
      },
      animation: {
        "sun-rise": "sunRise 6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fox-tail": "foxTail 3s ease-in-out infinite",
        "fox-ear": "foxEar 5s ease-in-out infinite",
        "drift-slow": "drift 18s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite linear",
      },
      keyframes: {
        sunRise: {
          "0%": { transform: "translateY(40px)", opacity: "0.4" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        foxTail: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(6deg)" },
        },
        foxEar: {
          "0%, 90%, 100%": { transform: "rotate(0deg)" },
          "93%": { transform: "rotate(-8deg)" },
          "97%": { transform: "rotate(5deg)" },
        },
        drift: {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(15px) translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
