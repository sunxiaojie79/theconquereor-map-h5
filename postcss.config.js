/* eslint-disable @typescript-eslint/no-require-imports */
const autoprefixer = require("autoprefixer");
const px2viewport = require("postcss-px-to-viewport-8-plugin");

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    autoprefixer(),
    px2viewport({
      viewportWidth: 375,
      exclude: [/node_modules/],
    }),
  ],
};
