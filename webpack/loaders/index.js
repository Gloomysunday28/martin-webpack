const fs = require('fs')
const path = require('path')
const { getExt, warn } = require('../util')

const basePath = path.dirname(path.dirname(require.main.filename))

module.exports = function(mModule, config, modules, {
  isIndex,
  ENTRY_PATH,
  parseModule,
  entry
}) {
  let loaderPath
  if (mModule.rules && Array.isArray(mModule.rules)) {
    for (let rule of mModule.rules) {
      if (!rule.test) {
        warn('test attribute is empty, please check your config again!')
        return
      }
      if (rule.test.exec(getExt(entry))) {
        for (let resolve of (config.resolveLoaders || [])) {
          loaderPath = getExt(path.join(basePath, config.resolveLoaders.length > 1 ? resolve : '' , rule.loader))
          if (fs.existsSync(loaderPath)) {
            const loader = require(loaderPath)
            // loader配置集成
            const loaderConfig = {
              isIndex,
              ENTRY_PATH,
              parseModule,
              entryModule: modules[getExt(config.entry)].modules[entry],
              loaderEntry: getExt(entry),
              preTransformEntry: entry,
              modules
            }
    
            if (!typeof loader === 'function') return void warn(`${loaderPath} export is not a function`)
            loader(loaderConfig)
            return true
          }
        }
      }
    }
  }

  return void warn(`${loaderPath} is not exist!`)
}