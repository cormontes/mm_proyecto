module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: {
        default: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    colors: {
      transparent: "transparent",
      black: "#000000",
      blackText: "#1a1818",
      lightblue: "#eff8ff",
      blueText: "#001e2d",
      darkblue: "#0278ae",
      beige: "#fefae3",
      beigeDark: "#fdb827",
      brown: "#e7dbcb",
      brownDark: "#8b693b",
      white: "#ffffff",
      greenSuccess: "#16c79a",
      green: "#daecda",
      greenDark: "#597260",
      pink: "#ffe6e6",
      pinkDark: "#f58484",
      purple: "#e9e0f2",
      purpleDark: "#9d65c9",
      yellow: "#ffe100",
      orange: "#ee9c75",
      grayFooter: "#f2f2f2",
      grayText: "#a3a3a3",
      grayText2: "#c2c0c0",
      red: "#ff5555",
    },
    fontFamily: {
      neutra: "Neutra",
      circular: "Circular",
    },
    extend: {
      spacing: {
        128: "32rem",
        148: "37rem",
      },
    },
  },
  variants: {
    extend: {
      scale: ["active", "group-hover"],
      translate: ["active", "group-hover"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};