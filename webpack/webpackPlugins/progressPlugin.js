function ProgressPlugin(cb) {
  this.init()
}

ProgressPlugin.prototype = {
  constructor: 'ProgressPlugin',
  init(modules) {
    this.cb && this.cb(modules.progress)

    if (modules.progress < 1) {

    }
  },
  throttle() {

  }
}

ProgressPlugin.install = {
  install(MWebpack) {
    MWebpack.prototype.ProgressPlugin = ProgressPlugin
  }
}

module.exports = ProgressPlugin
