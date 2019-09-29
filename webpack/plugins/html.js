
function ProgressBar(option = {}) {
  this.option = option
}

ProgressBar.prototype = {
  constructor: ProgressBar,
  init(modules, config, mWebpack) {
    console.log(mWebpack.prototype);
    
    const html = new mWebpack.prototype.HTMLWebpackPlugin()
    html.init(modules, config)
  }
}

module.exports = ProgressBar