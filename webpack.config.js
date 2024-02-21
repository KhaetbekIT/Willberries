const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    index: "./index.js",
    goods: "./goods.js",
  },
  output: {
    filename: "./js/[name].js",
    path: path.resolve(__dirname, "./"),
  },
  devServer: {
    port: 3000,
    hot: true,
    static: {
      directory: path.resolve(__dirname, "./"),
      watch: true,
    },
  },
  performance: {
    maxAssetSize: 400000,
  },
};
