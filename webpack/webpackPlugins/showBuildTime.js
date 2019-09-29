const { success } = require('../util')

function ShowBuildTime() {
  this.init()
}

ShowBuildTime.prototype = {
  constructor: 'ShowBuildTime',
  init(modules) {
    for (let mod in modules) {
      const mode = modules[mod]
      mode.showBuildTime = true
      mode.finishTime = +new Date()
      success(`Build module [${mod}] in ${(mode.finishTime - mode.startTime) / 1000}s`)
    }
  },
}

exports.install = {
  install(MWebpack) {
    MWebpack.prototype.ShowBuildTime = ShowBuildTime
  }
}

module.exports = ShowBuildTime