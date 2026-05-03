import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#fde68a",
          50: "#f4f4f5"
        },
        text: "#222222",
        highlight: "#a78bfa",
        accent: {
          DEFAULT: "#5eead4",
          200: "#a5b4fc"
        }
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(34,34,34,0.25)",
        card: "0 8px 24px -12px rgba(34,34,34,0.2)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      }
    }
  },
  plugins: []
}

export default config
