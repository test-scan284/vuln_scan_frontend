export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
            filter: 'drop-shadow(0 0 6px #0ff)', 
          },
          '50%': {
            transform: 'translateY(-30px)',
            filter: 'drop-shadow(0 0 12px #0ff)', 
          },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
