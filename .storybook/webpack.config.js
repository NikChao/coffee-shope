const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: [
          {
            loader: "style-loader", 
          },
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }, 
          {
            loader: "sass-loader",
          }
        ],
        include: path.resolve(__dirname, "../")
      },
      {
        test: /\.svg$/,
        loader: 'react-svg-loader'
      }
    ]
  }
};