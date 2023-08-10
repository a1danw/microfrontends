// when we run webpack we are either merging the common/dev or common/prod together
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production", // makes sure all js files that are built, get optimized by minifying them and adding small optimizations
  output: {
    // ensures whenever we build some files for production, all the different files that are build are going to use this as a template on how to name them
    // done primarily for caching issues
    filename: "[name].[contenthash].js",
    publicPath: "/container/latest/",
  },
  // production settings - urls point to production domain as opposed to localhost
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
        dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
