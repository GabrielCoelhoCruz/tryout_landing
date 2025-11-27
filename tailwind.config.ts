import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores do logo SkyHigh AllStar
        primary: {
          DEFAULT: '#FF7F00', // Laranja vibrante (letras e borda do escudo)
          dark: '#CC6600',    // Laranja mais escuro
          light: '#FF9933',   // Laranja mais claro
          '50': '#FFF4E6',
          '100': '#FFE6CC',
          '200': '#FFCC99',
          '300': '#FFB366',
          '400': '#FF9933',
          '500': '#FF7F00',
          '600': '#CC6600',
          '700': '#994D00',
          '800': '#663300',
          '900': '#331A00',
        },
        // Azul royal - cor principal dos uniformes e logo
        royal: {
          DEFAULT: '#1E3A8A', // Azul royal (uniformes e fundo do logo)
          light: '#2563EB',   // Azul royal mais claro
          lighter: '#3B82F6', // Azul royal ainda mais claro
          dark: '#1E40AF',    // Azul royal mais escuro
          darker: '#1E293B',  // Azul royal muito escuro
          '50': '#EFF6FF',
          '100': '#DBEAFE',
          '200': '#BFDBFE',
          '300': '#93C5FD',
          '400': '#60A5FA',
          '500': '#3B82F6',
          '600': '#2563EB',
          '700': '#1D4ED8',
          '800': '#1E3A8A',
          '900': '#1E293B',
        },
        // Tom coral dos detalhes dos uniformes
        coral: {
          DEFAULT: '#FF8C69', // Coral (detalhes dos uniformes)
          light: '#FFA07A',   // Coral mais claro
          lighter: '#FFB399', // Coral ainda mais claro
          dark: '#FF6B6B',    // Coral mais escuro
          darker: '#FF4D4D',  // Coral muito escuro
        },
        secondary: {
          1: '#0A1B4D',       // Azul escuro/navy (camada interna do escudo)
          '1-light': '#0F2A6B',
          '1-dark': '#050E2E',
          2: '#00BFFF',       // Azul elétrico/ciano (efeitos de raios)
          '2-dark': '#0099CC', // Azul elétrico mais escuro
          '2-light': '#33CCFF', // Azul elétrico mais claro
        },
        dark: {
          DEFAULT: '#0A0A2A',  // Azul muito escuro (fundo externo)
          light: '#14143A',
          lighter: '#1E1E4A',
        },
        bg: {
          DEFAULT: '#FAFAFA',
          alt: '#FFFFFF',
          dark: '#0A0A2A',     // Para seções escuras
        },
        ink: {
          DEFAULT: '#0A0A0A',
          muted: '#4A4A4A',
          light: '#6B6B6B',
        },
        muted: '#E5E5E5',
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Bebas Neue', 'Oswald', 'Impact', 'sans-serif'],
        body: ['var(--font-body)', 'Work Sans', 'Nunito Sans', 'Inter', 'sans-serif'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: 'clamp(1rem, 1.5vw, 1.125rem)',
        lg: 'calc(clamp(1rem, 1.5vw, 1.125rem) * 1.25)',
        xl: 'calc(clamp(1rem, 1.5vw, 1.125rem) * 1.563)',
        '2xl': 'calc(clamp(1rem, 1.5vw, 1.125rem) * 1.953)',
        '3xl': 'calc(clamp(1rem, 1.5vw, 1.125rem) * 2.441)',
        '4xl': 'calc(clamp(1rem, 1.5vw, 1.125rem) * 3.052)',
        '5xl': 'calc(clamp(1rem, 1.5vw, 1.125rem) * 3.815)',
      },
      spacing: {
        xs: 'calc(0.5rem * 1)',
        sm: 'calc(0.5rem * 2)',
        md: 'calc(0.5rem * 4)',
        lg: 'calc(0.5rem * 6)',
        xl: 'calc(0.5rem * 8)',
        '2xl': 'calc(0.5rem * 12)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '300ms',
        slow: '500ms',
        slower: '800ms',
      },
      maxWidth: {
        container: '1440px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
