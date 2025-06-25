/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        gold: "#ffd33d",
        goldLight: "#ffedb1",
      },
    },
    keyframes: {
      buttonBounce: {
        "0%": { transform: "scale(0)" },
        "40%": { transform: "scale(1.1)" },
        "60%": { transform: "scale(0.9)" },
        "80%": { transform: "scale(1.02)" },
        "90%": { transform: "scale(0.98)" },
        "100%": { transform: "scale(1)" },
      },
    },
    animation: {
      buttonBounce: "buttonBounce",
    },
  },
  plugins: [],
};
