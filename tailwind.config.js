/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // All mapped to CSS variables — automatically switch with theme
        bg:      'var(--bg)',
        accent:  'var(--accent)',   // dark=cyan  / light=orange
        accent2: 'var(--accent2)',  // dark=violet / light=blue
        accent3: 'var(--accent3)',  // dark=green  / light=orange
        accent4: 'var(--accent4)',  // dark=yellow / light=blue
        muted:   'var(--muted)',
        // Keep old aliases so existing class names still work
        cyan:    'var(--accent)',
        violet:  'var(--accent2)',
        green:   'var(--accent3)',
        yellow:  'var(--accent4)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
