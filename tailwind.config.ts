import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        spinAlternate: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(720deg)" },
        },
        spinReverse: {
          "0%, 100%": { transform: "rotate(720deg)" },
          "50%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        "spin-alternate": "spinAlternate 5s ease-in-out infinite",
        "spin-reverse": "spinReverse 5s ease-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
