const path = require('path')
const HTMLWebpackPlugin = require('./webpack/plugins/html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './sss'),
    fileName: '[name].[hash].js'
  },
  plugins: [
    new HTMLWebpackPlugin()
  ]
}