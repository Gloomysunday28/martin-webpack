const HTMLWebpackPlugin = require('./plugins/html-webpack-plugin')
const ShowBuildTime = require('./webpackPlugins/showBuildTime')

module.exports = {
  entry: {
    app: './src/index.js', 
    other: './src/other.js'
  },
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
    new HTMLWebpackPlugin(),
    new ShowBuildTime()
  ]
}