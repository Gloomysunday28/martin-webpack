const path = require('path')
const HTMLWebpackPlugin = require('./webpack/plugins/html-webpack-plugin')

module.exports = {
  entry: './src/test2.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    fileName: '[name].[hash].js'
  },
  plugins: [
    new HTMLWebpackPlugin()
  ]
}
