import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // House of Stroop kleurenschema
        'stroop': {
          50: '#fef7f7',   // Lichtste roze
          100: '#fdeeee',  // Zacht roze
          200: '#fbd8d8',  // Perzik
          300: '#f7b8b8',  // Medium roze
          400: '#f08d8d',  // Donker roze
          500: '#e66666',  // Hoofd roze
          600: '#d13d3d',  // Roodbruin
          700: '#b02a2a',  // Terracotta
          800: '#922525',  // Donker terracotta
          900: '#7a2222',  // Donkest
        },
        'stroop-gold': '#d4af37',  // Goud accent
        'stroop-cream': '#f5f5dc', // Crème
        'stroop-warm': '#f4e4bc',  // Warme tint
      },
      fontFamily: {
        'display': ['var(--font-display)', 'system-ui', 'sans-serif'],
        'body': ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'drip': 'drip 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        drip: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(10px) scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
