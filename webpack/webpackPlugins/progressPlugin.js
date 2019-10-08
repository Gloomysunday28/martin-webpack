class ProgressPlugin {
  constructor() {
  }
  init(modules) {
    this.cb && this.cb(modules.progress)

    if (modules.progress < 1) {

    }
  }
}

ProgressPlugin.install = {
  install(MWebpack) {
    MWebpack.prototype.ProgressPlugin = ProgressPlugin
  }
}

module.exports = ProgressPlugin
