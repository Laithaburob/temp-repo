// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",        // App Router layouts, pages, components
      "./src/components/**/*.{js,ts,jsx,tsx}" // your reusable components
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  