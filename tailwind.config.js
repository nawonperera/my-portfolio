/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        spidey: {
          red: "#e63946",
          darkRed: "#c1121f",
          blue: "#1d3557",
          darkBlue: "#0d1b2a",
          lightBlue: "#457b9d",
          react: "#61dafb",
          light: "#f1faee",
          gold: "#f4a261",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        comic: ["Bangers", "cursive"],
      },
      animation: {
        "swing": "swing 3s ease-in-out infinite",
        "web-shoot": "webShoot 0.5s ease-out",
        "spider-drop": "spiderDrop 0.8s ease-out",
        "pulse-red": "pulseRed 2s ease-in-out infinite",
        "crawl": "crawl 20s linear infinite",
      },
      keyframes: {
        swing: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        webShoot: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
        spiderDrop: {
          "0%": { transform: "translateY(-100px)", opacity: "0" },
          "60%": { transform: "translateY(20px)" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseRed: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(230, 57, 70, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(230, 57, 70, 0.8)" },
        },
        crawl: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "100px 100px" },
        },
      },
      backgroundImage: {
        'web-radial': 'radial-gradient(circle, transparent 20%, rgba(230,57,70,0.1) 20%, rgba(230,57,70,0.1) 21%, transparent 21%)',
      },
    },
  },
  plugins: [],
}