/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customSkyblue: '#ECF6FF',
        customWhite: '#fafcff',
        customClinic: '#007BFF',
        customDoctor: '#A9A9A9',
        customPharmacy: '#4CAF50',
        customStudent: '#FFD700',
      },
    },
  },
  plugins: [],
};
