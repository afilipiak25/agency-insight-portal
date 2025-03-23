
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
          DEFAULT: "#F79533", // Orange from the gradient
          light: "#F8C26A",
          dark: "#D99423",
        },
        amplifa: {
          orange: "#F79533", // Primary orange (start of gradient)
          pink: "#EF4E7B", // Pink (middle of gradient)
          purple: "#A166AB", // Purple (end of gradient)
          blue: {
            light: "#2AA4FB", // Light blue (RGB: 42, 164, 251)
            DEFAULT: "#2A69FB", // Blue (RGB: 42, 105, 251)
            dark: "#552AFB", // Dark blue (RGB: 85, 42, 251)
          },
          black: "#060A0F", // Dark black (RGB: 6, 10, 15)
          white: "#FFFFFF", // White
          gradient: "linear-gradient(90deg, #F79533 0%, #F37055 30%, #EF4E7B 60%, #A166AB 100%)",
        },
        dashboard: {
          primary: "#F79533", // Changed to new orange
          secondary: "#EF4E7B", // Changed to new pink
          hover: "#F79533/90", // Orange with 90% opacity
          light: "#F79533/10", // Orange with 10% opacity
          accent: "#A166AB/80", // Purple with 80% opacity
        },
      },
      backgroundImage: {
        'gradient-amplifa': 'linear-gradient(90deg, #F79533 0%, #F37055 30%, #EF4E7B 60%, #A166AB 100%)',
        'gradient-dashboard': 'linear-gradient(90deg, #F79533 0%, #F37055 30%, #EF4E7B 60%, #A166AB 100%)',
        'gradient-shine': 'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.3) 50%, transparent 75%)',
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
