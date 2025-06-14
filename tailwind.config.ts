
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Audiophile brand colors from Figma design
				'audiophile-orange': '#D87D4A',
				'audiophile-dark': '#191919',
				'audiophile-light-orange': '#FBAF85',
				'audiophile-black': '#000000',
				'audiophile-white': '#FFFFFF',
				'audiophile-light-gray': '#F1F1F1',
				'audiophile-dark-gray': '#4C4C4C',
				'audiophile-very-dark': '#101010',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				'manrope': ['Manrope', 'sans-serif'],
			},
			fontSize: {
				// Exact Figma typography specifications
				'h1': ['56px', { lineHeight: '58px', letterSpacing: '2px', fontWeight: '700' }],
				'h2': ['40px', { lineHeight: '44px', letterSpacing: '1.5px', fontWeight: '700' }],
				'h3': ['32px', { lineHeight: '36px', letterSpacing: '1.15px', fontWeight: '700' }],
				'h4': ['28px', { lineHeight: '38px', letterSpacing: '2px', fontWeight: '700' }],
				'h5': ['24px', { lineHeight: '33px', letterSpacing: '1.7px', fontWeight: '700' }],
				'h6': ['18px', { lineHeight: '24px', letterSpacing: '1.3px', fontWeight: '700' }],
				'overline': ['14px', { lineHeight: '19px', letterSpacing: '10px', fontWeight: '400' }],
				'subtitle': ['13px', { lineHeight: '25px', letterSpacing: '1px', fontWeight: '700' }],
				'body': ['15px', { lineHeight: '25px', fontWeight: '500' }],
			},
			screens: {
				// Exact Figma breakpoints
				'mobile': '375px',
				'tablet': '768px',
				'desktop': '1440px',
			},
			spacing: {
				// Common spacing values from Figma
				'15': '60px',
				'18': '72px',
				'20': '80px',
				'25': '100px',
				'30': '120px',
				'40': '160px',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
