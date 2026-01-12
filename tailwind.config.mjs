/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        primary: {
          50: '#f0f7f9',
          100: '#dbeef2',
          200: '#bcdde7',
          300: '#8dc4d5',
          400: '#57a3bc',
          500: '#3b85a1',
          600: '#326b87',
          700: '#2c566e',
          800: '#29495c',
          900: '#183e4b', // L4 Main Teal (base)
          950: '#0f2830',
        },
        accent: {
          50: '#fef6f2',
          100: '#fdeae2',
          200: '#fad1c0',
          300: '#f6b094',
          400: '#f08258',
          500: '#e8632e',
          600: '#c7522a', // L4 Orange (base)
          700: '#b84420',
          800: '#97391d',
          900: '#7c311d',
          950: '#43170c',
        },
        // Secondary/Functional Colors
        blue: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e3fe',
          300: '#7ccdfd',
          400: '#36b4fa',
          500: '#0c9aeb',
          600: '#005485', // L4 Blue (base)
          700: '#01689f',
          800: '#065883',
          900: '#0b4a6d',
          950: '#072f48',
        },
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#d74a49', // L4 Red (base)
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        green: {
          50: '#f0fdf7',
          100: '#dcfce9',
          200: '#bbf7d5',
          300: '#86efb0',
          400: '#4ade80',
          500: '#74a892', // L4 Lt. Green (base)
          600: '#5d8a75',
          700: '#4a6e5e',
          800: '#3d584d',
          900: '#334941',
          950: '#1a2823',
        },
        // Neutral Palette
        neutral: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#b1c0c9', // L4 Lt. Gray (base)
          600: '#8b9ba6',
          700: '#7b7c7f', // L4 Dk Gray (body text)
          800: '#495057',
          900: '#343a40',
          950: '#1a1d20',
        },
        // Warm Accent Colors
        cream: {
          50: '#fefdfb',
          100: '#fdfbf6',
          200: '#fbf2c4', // L4 Cream (base)
          300: '#f9eda0',
          400: '#f6e56d',
          500: '#f2d93e',
          600: '#e4c022',
          700: '#c19b18',
          800: '#9a7a18',
          900: '#7f6419',
          950: '#48370b',
        },
        wheat: {
          50: '#faf8f3',
          100: '#f5f0e4',
          200: '#e5c185', // L4 Wheat (base)
          300: '#ddb46a',
          400: '#d39e47',
          500: '#c98a33',
          600: '#b17028',
          700: '#925623',
          800: '#784722',
          900: '#633c20',
          950: '#381e0f',
        },
        // Semantic Aliases for Easy Use
        body: '#7b7c7f',      // Default body text color
        heading: '#183e4b',   // Default heading color
        border: '#b1c0c9',    // Default border color
        background: '#ffffff', // Default background
      },
      fontFamily: {
        // Display font for headings - Neue Kabel (loaded via Adobe Typekit)
        display: ['"Neue Kabel"', 'system-ui', 'sans-serif'],
        // Body font - Modern system font stack for performance
        sans: ['Bahnschrift', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
        // Monospace for code
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        // Responsive fluid typography using clamp()
        'hero': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', fontWeight: '900' }],      // 40px-80px
        'display': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.2', fontWeight: '900' }],   // 32px-56px
        'heading-1': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.3', fontWeight: '700' }], // 28px-40px
        'heading-2': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.4', fontWeight: '600' }],  // 24px-32px
        'heading-3': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.5', fontWeight: '600' }], // 20px-24px
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],  // 18px
        'body': ['1rem', { lineHeight: '1.75' }],         // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],   // 14px
        'caption': ['0.75rem', { lineHeight: '1.5' }],    // 12px - for image captions
        'label': ['0.813rem', { lineHeight: '1.4' }],     // 13px - for form labels
        'blockquote': ['1.25rem', { lineHeight: '1.6', fontStyle: 'italic' }], // 20px
      },
      fontWeight: {
        'light': '300',      // Body text
        'normal': '400',     // Default
        'medium': '500',     // Subheadings
        'semibold': '600',   // Important text
        'bold': '700',       // Strong emphasis
        'extrabold': '800',  // Not commonly used
        'black': '900',      // Display headings (Neue Kabel)
      },
      lineHeight: {
        'tight': '1.1',      // For large display text
        'snug': '1.375',     // For headings
        'relaxed': '1.75',   // For body text (your current default)
        'loose': '2',        // For very readable content
      },
      letterSpacing: {
        'tighter': '-0.05em',  // For large display text
        'tight': '-0.025em',   // For headings
        'normal': '0',
        'wide': '0.025em',     // For uppercase text
        'wider': '0.05em',     // For all-caps navigation
        'widest': '0.1em',     // For emphasis
      },
      spacing: {
        // Custom spacing for brand-specific layouts
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
        '112': '28rem',   // 448px
        '128': '32rem',   // 512px
      },
      maxWidth: {
        'prose': '65ch',      // Optimal reading width (65 characters)
        'prose-lg': '75ch',   // Wider reading area
        'content': '42rem',   // 672px - good for content blocks
      },
      borderRadius: {
        // Brand-specific border radius
        'brand': '0.375rem',  // 6px - your standard rounded corners
      },
      boxShadow: {
        // Brand-specific shadows
        'brand': '0 0 10px rgba(0, 0, 0, 0.63)',           // Your standard shadow
        'brand-sm': '0 0 5px rgba(0, 0, 0, 0.4)',          // Lighter version
        'brand-lg': '0 0 20px rgba(0, 0, 0, 0.7)',         // Stronger version
        'brand-teal': '0 0 15px rgba(24, 62, 75, 0.3)',    // Brand color glow
        'brand-orange': '0 0 15px rgba(199, 82, 42, 0.3)', // Accent color glow
      },
      transitionDuration: {
        'fast': '150ms',    // Quick feedback
        'brand': '200ms',   // Your standard
        'slow': '300ms',    // Slower, more dramatic
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(0.4, 0, 0.2, 1)',           // Smooth easing
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Subtle bounce
        'smooth': 'cubic-bezier(0.4, 0, 0, 1)',            // Smooth ease-out
      },
      zIndex: {
        'base': '0',
        'dropdown': '10',
        'sticky': '20',
        'fixed': '30',
        'modal-backdrop': '40',
        'modal': '50',
        'popover': '60',
        'tooltip': '70',
      },
      aspectRatio: {
        'hero': '16 / 9',
        'portrait': '3 / 4',
        'square': '1 / 1',
        'video': '16 / 9',
        'ultrawide': '21 / 9',
      },
    },
    // Container configuration (not inside extend)
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',   // 16px
        sm: '1.5rem',      // 24px
        md: '2rem',        // 32px
        lg: '3rem',        // 48px
        xl: '4rem',        // 64px
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',  // Max width for your content
      },
    },
  },
  plugins: [],
}
