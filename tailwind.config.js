module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,tsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#2C5F2D",
        "weather-secondary": "#97BC62FF",
      },
    },
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
    },
  },
  container: {
    padding: "2rem",
    center: true,
  },
  screens: {
    sm: "640px",
    md: "768px",
  },
  plugins: [],
};
