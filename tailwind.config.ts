import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        secondary: "#4e4e4e",
        grey: "#f6f6f6",
        dark: "#291C39",
        orange: "#FA9946",
        perrywinkle: "#7F71FA",
        grimace: "#6F4D9B",
        pink: "#B77BBF",
        "orange-light": "#F7857C",
        "orange-gradient": "#FFB400",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-sunset": "linear-gradient(90deg, #FFB400 0%, #F7857C 36%, #7F71FA 100%)",
        "gradient-acid": "linear-gradient(90deg, #FF8C04 0%, #F36966 40%, #6B5AEE 100%)",
        "gradient-hero": "linear-gradient(90deg, rgb(249,167,95) 0%, rgb(230,124,90) 100%)",
      },
      borderRadius: {
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
