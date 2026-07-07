import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: "#eff8ff",
          100: "#dff0ff",
          500: "#2084e8",
          600: "#116ac7",
          700: "#0d529e"
        },
        sunshine: {
          100: "#fff3bd",
          300: "#ffe066",
          400: "#ffd43b"
        },
        ink: "#172033"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(17, 106, 199, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
