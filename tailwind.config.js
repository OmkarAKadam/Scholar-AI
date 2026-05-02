/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:   '#2F8D46',
          dark:      '#1A6B32',
          light:     '#E8F5E9',
        },
        study: {
          DEFAULT:   '#3B82F6',
          light:     '#EFF6FF',
          dark:      '#1D4ED8',
        },
        resume: {
          DEFAULT:   '#F59E0B',
          light:     '#FFFBEB',
          dark:      '#B45309',
        },
        code: {
          DEFAULT:   '#8B5CF6',
          light:     '#F5F3FF',
          dark:      '#6D28D9',
        },
        neutral: {
          50:  '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          700: '#374151',
          900: '#111827',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
