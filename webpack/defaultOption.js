const HTMLWebpackPlugin = require('./plugins/html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    fileName: '[name].[hash].js'
  },
  resolveLoaders: './webpack/loaders',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new HTMLWebpackPlugin()
  ]
}