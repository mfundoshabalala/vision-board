/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			animation: {
				torch: 'torch 6s infinite',
			},
			keyframes: {
				torch: {
					'0%': {
						backgroundPosition: '-300% 0',
					},
					'50%': {
						backgroundPosition: '300% 0',
					},
					'100%': {
						backgroundPosition: '-150% 0',
					},
				},
			},
		},
	},
	plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms')],
};
