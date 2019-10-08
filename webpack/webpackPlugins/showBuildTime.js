const { success } = require('../util')

class ShowBuildTime {
  constructor(option) {
    this.option = option
  }
  init(modules) {
    for (let mod in modules) {
      const mode = modules[mod]
      mode.showBuildTime = true
      mode.finishTime = +new Date()
      success(`Build module [${mod}] in ${(mode.finishTime - mode.startTime) / 1000}s`)
    }
  }
}

ShowBuildTime.install = {
  install(MWebpack) {
    MWebpack.prototype.ShowBuildTime = ShowBuildTime
  }
}

module.exports = ShowBuildTime