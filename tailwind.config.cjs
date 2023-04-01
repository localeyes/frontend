const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/typography'),
		require('daisyui'),
	],
	daisyui: {
		themes: [
			{
				'light': {
					...require('daisyui/src/colors/themes')['[data-theme=light]'],
					primary: '#73c6b6',
					secondary: '#f8c8dc',
					accent: '#aec6cf',
					'.bg-gradient-dots': {
						'background-image': 'radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.2) 1px, transparent 0);'
					}
				},
			},
			{
				'dark': {
					...require('daisyui/src/colors/themes')['[data-theme=dark]'],
					primary: '#73c6b6',
					secondary: '#f8c8dc',
					accent: '#aec6cf',
					'.bg-gradient-dots': {
						'background-image': 'radial-gradient(circle at 1px 1px, rgba(70, 70, 70, 0.7) 1px, transparent 0);'
					}
				},
			},
		],
	}
};

module.exports = config;
