export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["'Playfair Display'", "serif"],
        content: ["./src/**/*.{js,jsx,ts,tsx}"],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-in-out',
        'spin-slow': 'spin 5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
