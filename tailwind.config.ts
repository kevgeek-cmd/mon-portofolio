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
        primary: "#ffb68b",
        "primary-container": "#ff7a00",
        "on-primary-container": "#432100",
        surface: "#090909",
        "surface-container": "#121414",
        "surface-container-high": "#1a1c1c",
        "surface-container-highest": "#282a2a",
        "on-surface": "#f5f5f5",
        "on-surface-variant": "#a79c94",
        outline: "#4d4541",
        amberGlow: "#FF7A00",
        brand: {
          blue: "#2563EB",
          blueLight: "#3B82F6",
          blueDark: "#1D4ED8",
          dark: "#0F172A",
          darkCard: "#1E293B",
          light: "#F8FAFC",
          white: "#FFFFFF",
          gray: "#64748B",
          grayLight: "#E2E8F0",
          gold: "#D4AF37", // Keep for admin panel compatibility
          beige: "#F7F5F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "sans-serif"],
        mono: ["var(--font-space-grotesk)", "Space Grotesk", "monospace"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
        'glass-gradient': 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)',
        'amber-gradient': 'linear-gradient(135deg, #FF7A00 0%, #FF9E40 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'amber-glow': '0 0 25px rgba(255, 122, 0, 0.45)',
        'amber-glow-lg': '0 8px 35px rgba(255, 122, 0, 0.4)',
      }
    },
  },
  plugins: [],
};
export default config;
