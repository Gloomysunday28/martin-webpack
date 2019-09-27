const path = require('path')
const HTMLWebpackPlugin = require('./plugins/html-webpack-plugin')

module.exports = {
  entry: {
   'app' : './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    fileName: '[name].js'
  },
  plugins: [
    new HTMLWebpackPlugin()
  ]
}