module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        margin: "auto",
        padding: "1rem",
      },
      maxWidth: {
        limit: "1440px",
      },
      colors: {
        primary: "#f1f5f9",
        secondary: "#dff1ff",
        tertiary: "#78B7F5",
        accent: "##98dbff",
        warning: "#0a4870",
        input: "#8B9699",
      },
      fontSize: {
        8: "0.5rem",
        10: "0.625rem",
        11: "0.6875rem",
        12: "0.75rem",
        14: "0.875rem",
        16: "1rem",
        18: "1.125rem",
        20: "1.250rem",
        22: "1.375rem",
        25: "1.5rem",
        28: "1.75rem",
        h1: "3rem",
        h2: "2.5rem",
        h3: "2rem",
        h4: "1.75rem",
        h5: "1.5rem",
        h6: "1.375rem",
      },
    },
    plugins: [],
  },
};
