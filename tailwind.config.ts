import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/*/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      serif: [
        "var(--font-playfair-display)",
        "ui-serif",
        "Georgia",
        "Cambria",
        "Times New Roman",
        "Times",
        "serif",
      ],
      sans: [
        "var(--font-dm-sans)",
        "ui-sans",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
      ],
    },
    fontSize: {
      display: [
        "3.5rem",
        {
          fontWeight: 500,
          lineHeight: "4.25rem",
        },
      ],
      h1: [
        "2.875rem",
        {
          fontWeight: 500,
          lineHeight: "3.625rem",
        },
      ],
      h2: [
        "2.25rem",
        {
          fontWeight: 500,
          lineHeight: "3rem",
        },
      ],
      h3: [
        "1.5rem",
        {
          fontWeight: 500,
          lineHeight: "1.875rem",
        },
      ],
      caps1: [
        "1.125rem",
        {
          fontWeight: 600,
          lineHeight: "1.787rem",
          letterSpacing: "0.18rem",
        },
      ],
      caps2: [
        "0.875rem",
        {
          lineHeight: "1.137rem",
          letterSpacing: "0.0875rem",
          fontWeight: 600,
        },
      ],
      caps3: [
        "0.75rem",
        {
          lineHeight: "0.853rem",
          letterSpacing: "0.075rem",
          fontWeight: 600,
        },
      ],
      sub: [
        "1.25rem",
        {
          lineHeight: "1.625rem",
        },
      ],
      body: [
        "1.125rem",
        {
          fontWeight: 400,
          lineHeight: "1.487rem",
        },
      ],
      md: [
        "0.875rem",
        {
          lineHeight: "1.1375rem",
          fontWeight: 300,
        },
      ],
      sm: [
        "0.75rem",
        {
          lineHeight: "0.975rem",
          fontWeight: 500,
        },
      ],
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        marque: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marque: "marque var(--duration) linear infinite",
      },
    },
  },
  plugins: [tailwindAnimate, typography],
} satisfies Config;
