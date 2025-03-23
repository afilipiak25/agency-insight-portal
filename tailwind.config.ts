import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#6B62E3", // New primary color (indigo)
          light: "#8A84E8",
          dark: "#4A42D6",
        },
        amplifa: {
          blue: {
            DEFAULT: "#6B62E3", // Unified with primary
            light: "#8A84E8",
            dark: "#4A42D6",
          },
          purple: "#7C3AED", // Simplified purple
          orange: "#F97316", // Reduced saturation
          pink: "#EC4899", // Reduced saturation
          black: "#1F2937", // Warmer black
          white: "#FFFFFF",
        },
        dashboard: {
          primary: "#6B62E3", // Unified with primary
          secondary: "#8A84E8", // Light variant
          hover: "rgba(107, 98, 227, 0.9)", // Primary with opacity
          light: "rgba(107, 98, 227, 0.1)", // Very light primary
          accent: "rgba(124, 58, 237, 0.8)", // Purple with opacity
        },
      },
      backgroundImage: {
        'gradient-amplifa': 'linear-gradient(90deg, #6B62E3 0%, #7C3AED 100%)', // Simplified gradient
        'gradient-dashboard': 'linear-gradient(90deg, #6B62E3 0%, #7C3AED 100%)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        popIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '70%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        },
        shimmer: {
          '100%': { backgroundPosition: '200% center' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "pop-in": "popIn 0.3s ease-out",
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce": "bounce 0.5s ease infinite",
        "shimmer": "shimmer 2s infinite"
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.1)',
        'card-hover': '0 6px 16px rgba(0,0,0,0.1)',
        'button': '0 2px 4px rgba(0,0,0,0.1)',
        'button-hover': '0 4px 8px rgba(0,0,0,0.2)',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
