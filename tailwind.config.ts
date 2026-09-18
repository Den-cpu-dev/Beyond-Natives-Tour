import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ember: "#ff3b30",
        ink: "#0b0b0c",
        mist: "#ecebe7",
      },
      fontFamily: {
        anton: ["var(--font-anton)", "Impact", "sans-serif"],
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
