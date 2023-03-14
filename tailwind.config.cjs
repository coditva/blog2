/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: theme("fontFamily.serif").join(","),
            overflowWrap: "anywhere",

            '&::first-letter': {
              float: 'left',
              fontSize: "3.5em",
              lineHeight: "1em",
              paddingRight: "0.12em",
              paddingTop: "0.01em",
            },

            // color: theme('colors.gray.800'),
            a: {
              color: theme("colors.blue.500"),
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              }
            },

            h1: {
              '&::before': {
                content: '""',
                height: '1px',
                width: '15%',
                display: 'block',
                backgroundColor: theme('colors.gray.200'),
                margin: '30px auto'
              },
            },

            // enable once we have a way to add anchors to headings
            // 'h1, h2, h3, h4, h5, h6': {
            //   '&:hover': {
            //     '&::after': {
            //       content: '"#"',
            //       position: 'absolute',
            //       marginLeft: '8px',
            //       color: theme('colors.gray.400'),
            //     },
            //   },
            // }

            // ...
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
