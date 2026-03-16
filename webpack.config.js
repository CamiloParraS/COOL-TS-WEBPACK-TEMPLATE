const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  entry: "./src/ts/index.ts",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    clean: true,
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // fonts.css references /fonts/*.ttf served statically from public/.
      // url:false tells css-loader to pass font URLs through untouched so
      // webpack doesn't try to bundle files that aren't in the src tree.
      {
        test: /fonts\.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { url: false } },
        ],
      },
      {
        test: /\.css$/,
        exclude: /fonts\.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "EWS UI",
    }),
    ...(isDev
      ? []
      : [new MiniCssExtractPlugin({ filename: "styles.[contenthash].css" })]),
  ],

  devServer: {
    // Serve both dist/ (built assets) and public/ (static files like fonts)
    static: [
      { directory: path.join(__dirname, "dist") },
      { directory: path.join(__dirname, "public"), publicPath: "/" },
    ],
    port: 3000,
    hot: true,
    open: true,
  },

  devtool: isDev ? "eval-source-map" : "source-map",
};
