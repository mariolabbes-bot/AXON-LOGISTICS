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
        axon: {
          orange: "#E06B32",       // Tangerine AXON CRM
          orangeLight: "#FF8A50",
          teal: "#20A892",         // Teal AXON CRM
          tealLight: "#48D1BB",
          dark: "#0B0F19",         // Background Indigo AXON CRM
          paper: "#151C2B",        // Background Solid AXON CRM
          glass: "rgba(21, 28, 43, 0.6)",
          text: "#E2E8F0",
          textMuted: "#94A3B8",
        }
      },
      backgroundImage: {
        'axon-gradient': 'linear-gradient(135deg, #E06B32 0%, #C35B29 100%)',
        'axon-teal-gradient': 'linear-gradient(135deg, #20A892 0%, #1A8C7A 100%)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};
export default config;
