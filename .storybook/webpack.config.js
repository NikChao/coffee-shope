const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve() + '/',
        exclude: path.resolve(__dirname, '/node_modules'),
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                modules: 'commonjs',
                exclude: ['es6.promise']
              }
            ],
            '@babel/preset-react',
            '@babel/preset-typescript'
          ],
          plugins: [
            [
              '@babel/plugin-proposal-decorators',
              {
                legacy: true
              }
            ],
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-json-strings',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-syntax-import-meta',
            '@babel/plugin-syntax-dynamic-import'
          ]
	}
      },
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
