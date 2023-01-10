module.exports = {
  content: ["./src/**/*.{html,njk,md}"],
  theme: {
    fontFamily: {
			notoSerif: ['Noto Serif', 'serif'],
			sourceSans: ['Source Sans Pro', 'sans-serif'],
			roboto: ['Roboto', 'sans-serif']
		},
		screens: {
			xs: "530px",
			sm: "640px",
			md: "768px",
			desk: "890px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},

		extend: {
			colors: {
				"flxBlue": "#17acff",
				"flxDark": "#172030",
				"flxBlack": "#21242b",
				"flxGray": "#6d727e",
				"flxGrayLight": "#fafcff",
			},
			boxShadow: {
				DEFAULT: '0 0 30px rgb(0 0 0 / 0.07)',
			},
		}
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
