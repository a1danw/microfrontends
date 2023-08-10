const { merge } = require("webpack-merge"); // merge together 2 different webpack config objects, in this case merged common and dev
const HtmlWebpackPlugin = require("html-webpack-plugin"); // take html file and inject script tags inside
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8081/",
  },
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing", // name of the sub project - the marketing name is going to be used to declare a global variable when the script loads up inside the container
      filename: "remoteEntry.js",
      // what file we want to be available to the outside world
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
      // without this, we are loading a copy of react in the container and in the marketing component
      // shared: ['react','react-dom']
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
