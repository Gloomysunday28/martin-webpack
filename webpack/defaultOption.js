const path = require('path')
const HTMLWebpackPlugin = require('./plugins/html-webpack-plugin')

module.exports = {
  entry: {
   'app' : './src/index.js'
  },
  output: {
    fileName: '[name].[hash].js'
  },
  plugins: [
    new HTMLWebpackPlugin()
  ]
}