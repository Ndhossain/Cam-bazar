/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      primary: '#222',
      secondary: '#FF3D3D',
      danger: '#dc3545',
      success: '#28a745',
    },
    fontFamily: {
      sans: ["Crate Helvetica", "Helvetica Neue", 'Helvetica', 'Arial'],
    },
  },
  plugins: [require('flowbite/plugin')],
}
