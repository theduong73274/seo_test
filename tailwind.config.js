/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./layouts/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				dancing: ['Dancing Script', 'scursive'],
				lora: ['Lora', 'serif'],
				voll: ['Vollkorn', 'serif'],
				pro: ['SF-Medium', 'sans-serif'],
			},
			fontSize: {
				'1xl': '22px',
				'32xl': '32px',
			},
			colors: {
				primary: '#F5C336',
				secondary: '#94949E',
			},
			backgroundImage: {
				'btn-pattern': "url('/public/image/button.png')",
				'btn-hover': "url('/public/image/button-hover.png')",
				'back-img':
					'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
			},
			boxShadow: {
				intro:
					'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
				item: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
			},
			keyframes: {
				fade: {
					'0%': {
						opacity: '0',
					},
					'100%': {
						opacity: '1',
					},
				},
				move: {
					'0%': {
						opacity: '1',
						transform: 'translateX(0%)',
					},
					'100%': {
						opacity: '0',
						transform: 'translateX(100%)',
					},
				},
				offcanvas: {
					'0%': {
						opacity: '0',
						transform: 'translateX(80%)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
			},
			animation: {
				'fade-in': 'fade 0.5s ease-out',
				'move-in': 'move 0.6s ease-in-out',
				'offcanvas-in': 'offcanvas .3s ease-in-out',
			},
			screens: {
				bg: { max: '1650px' },
				// => PC Big @media ( max-width: 1650px) { ... }

				bl: { max: '1600px' },
				// => PC Big-Low @media ( max-width: 1600px) { ... }

				ft: { max: '1440px' },
				// => PC Fit @media ( max-width: 1440px) { ... }

				fl: { max: '1366px' },
				// => PC Fit-Low @media ( max-width: 1366px) { ... }

				fs: { max: '1300px' },
				// => PC Fit-Small @media ( max-width: 1300px) { ... }

				hd: { max: '80.1875em' },
				// => PC HD @media ( max-width: 1283px) { ... }

				mat: { max: '63.9375em' },
				// => Mobile & Tablet @media ( max-width: 1023px) { ... }

				mb: { max: '46.1875em' },
				// => Mobile @media (max-width: 376px) { ... }

				sx: { max: '23.5em' },
				// => Mobile Small @media (max-width: 376px) { ... }
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
