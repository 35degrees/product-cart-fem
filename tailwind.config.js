/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		screens: {
			sm: '375px',
			md: '767px',
			lg: '1400px'
		},
		extend: {
			colors: {
				red: 'hsl(14, 86%, 42%)',
				green: 'hsl(159, 69%, 38%)',
				rose50: 'hsl(20, 50%, 98%)',
				rose100: 'hsl(13, 31%, 94%)',
				rose300: 'hsl(14, 25%, 72%)',
				rose400: 'hsl(7, 20%, 60%)',
				rose500: 'hsl(12, 20%, 44%)',
				rose900: 'hsl(14, 65%, 9%)'
			}
		}
	},

	plugins: []
};