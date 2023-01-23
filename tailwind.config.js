/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  plugins: [require("@tailwindcss/typography")],

  // Active dark mode on class basis
  darkMode: "class",
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  theme: {
    colors: {
      "body-light": "#f9f9ff",
      "body-dark": "#262A2E",
      "panel-light": "#ffffff",
      "panel-dark": "#161819",
      light: "#2D3350",
      dark: "#D4D4D4",
      meta: "#808495",
      highlight: "#FB2576",
      "tag-light": "#EFF1F4",
      "tag-dark": "#313438",
      "tag-react": "#FD94FF",
      "tag-remix": "#04baf6",
      "tag-freedombox": "#f18509",
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1320px",
    },
    container: {
      center: true,
    },
    boxShadow: {
      l: "0 15px 40px 5px rgba(132,132,133,0.15)",
      d: "0 10px 10px rgba(0,0,0,0.2)",
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            pre: {
              padding: 0,
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      inset: ["checked"],
      zIndex: ["hover", "active"],
    },
  },
  future: {
    purgeLayersByDefault: true,
  },
};
