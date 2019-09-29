const fs = require('fs')
const path = require('path')
const { getExt } = require('../util')

module.exports = function(mModule, config, modules, {
  isIndex,
  ENTRY_PATH,
  parseModule,
  entry
}) {
  if (mModule.rules && Array.isArray(mModule.rules)) {
    for (let rule of mModule.rules) {
      if (!rule.test) {
        warn('test attribute is empty, please check your config again!')
        return
      }
      if (rule.test.exec(getExt(entry))) {
        const loaderPath = getExt(path.join(process.cwd(), config.resolveLoaders, rule.loader))
        if (!fs.existsSync(loaderPath)) return warn(`${loaderPath} is not exist!`)
        const loader = require(loaderPath)
        // loader配置集成
        const loaderConfig = {
          isIndex,
          ENTRY_PATH,
          parseModule,
          entryModule: modules[getExt(config.entry)][entry],
          loaderEntry: getExt(entry),
          preTransformEntry: entry,
          modules
        }

        if (!typeof loader === 'function') return warn(`${loaderPath} export is not a function`)
        loader(loaderConfig)
      }
    }
  }

  return true
}