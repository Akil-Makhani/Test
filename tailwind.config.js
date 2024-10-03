/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // For Next.js App Directory
    "./pages/**/*.{js,ts,jsx,tsx}", // For Next.js Pages Directory
    "./components/**/*.{js,ts,jsx,tsx}", // For your components
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        xl: "1340px",
      },
    },
    extend: {
      animation: {
        "infinite-scroll": "infinite-scroll 8s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          "0%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(5%)" },
          "40%": { transform: "translateX(-2%)" },
          "60%": { transform: "translateX(4%)" },
          "80%": { transform: "translateX(-5%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      fontSize: {
        middle: "1.125rem", // Custom size between lg (1.125rem) and base (1rem)
        xxs: "0.625rem", // 10px
        "26px": "26px",
        "27px": "27px",
      },
      colors: {
        "sky-blue-200": "#CCEEFF",
        "gray-250": "#FCFCFC",
        "black-100": "#010101",
        "gray-50": "#2B3034",
        "gray-350": "#EEEEEE",
        "sky-blue-650": "#50C2FF",
        "gray-120": "#E8E8E8",
        "yellow-550": "#FEC53D",
        "neutral-850": "#565656",
        "sky-blue-20": "#F6FCFF",
        "gray-540": "#646464",
        "gray-45": "#ADADAD",
        "sky-blue-25": "#EEF9FF",
        "primary-blue": "#40E0D0",
        "slate-105": "#E4E6E8",
        "pastel-105": "#FF5A3C",
        "dark-blue-750": "#012E42",
        "pink-750": "#F08080",
        "orange-750": "#FF7F50",
        "sky-blue-750": "#20B2AA",
        "slate-240": "#F7F9FC",
        "slate-260": "#858D9D",
        "slate-120": "#EEF0F2",
        "blue-230": "#2F7BEB",
        "black-230": "#2E2E30",
        "slate-320": "#5D6679",
        "black-330": "#383E49",
        "gray-340": "#E8F1FD",
        "gray-350": "#737373",
        "yellow-350": "#EEE8AA",
        "gray-220": "#B9BDC7",
        "gray-130": "#202224",
      },
      borderWidth: {
        1.5: "1.5px",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
      borderRadius: {
        "4xl": "36px",
        "9xl": "140px",
      },
      screens: {
        mmd: "991px",
        base: "1144px",
        mid: "844px",
        xs: "520px",
      },
    },
  },
  plugins: [],
};
