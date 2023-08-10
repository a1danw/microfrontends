// common webpack configuration
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/, // js files are processed by babel
        exclude: /node_modules/, // dont try to run this babel config inside any files in the node_modules
        use: {
          loader: "babel-loader", // tells webpack to process some different files as we start to import them
          options: {
            // @babel/preset-react - babel can process jsx tags(any react related code), @babel/preset-env - transform code - convert all code to es5
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"], // different browser features async/await etc
          },
        },
      },
    ],
  },
};
