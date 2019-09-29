const co = require('co')
const fs = require('fs')
const path = require('path')
const colors = require('colors')
const { absoltePath } = require('./path')
const dealLoader = require('./loaders')
const dealPlugins = require('./plugins')
const { isFileExist, getExt, dealFileName, dealPath, warn } = require('./util')
const {
  template,
} = require('./template')

const modules = {}
const config = {}
let oldDate = 0

const parseModule = {
  parseModule(option, isIndex, date) {
    const {
      entry: entrys,
      context = isIndex ? process.cwd() : '',
      module: mModule = {},
      resolveLoaders = 'node_modules'
    } = option

    let entry = entrys

    if (Object.prototype.toString.call(entrys) === '[object Object]') {
      for (let i in entrys) {
        entry = entry[i]
      }
    } else if (Array.isArray(entrys)) {
      entry = entrys[0]
    }

    if (isIndex) {
      modules[getExt(entry)] = {}
      if (isIndex) {
        Object.assign(config, {...option, ...{resolveLoaders}})
      }
    }

    const ENTRY_PATH = absoltePath(context, getExt(entry))

    if (!isFileExist(ENTRY_PATH)) return warn(`${ENTRY_PATH} is no Exist`)

    // console.log(entry);
    modules[getExt(config.entry)][entry] = {
      path: getExt(entry),  
      originPath: entry,
      absoltePath: ENTRY_PATH,
      modules: [],
      exports: [],
      ...isIndex && {isIndex}
    }

    date && (oldDate = date)
    
    if (!dealLoader(mModule, config, modules, {
      isIndex,
      ENTRY_PATH,
      parseModule,
      entry
    })) return void 0

    if (isIndex) {
      generateCode(modules, modules[getExt(config.entry)], getExt(config.entry))
    }
  },
}

/**
 * @description 根据现有的AST树生成代码并输出文件
 * @param {*} astTree 
 * @param {*} content 
 * @param {*} ENTRY_PATH 
 */
function generateCode(modules, entryModules, ENTRY_PATH) {
  let entryModule

  for (let ms in entryModules) {
    if (entryModules[ms].isIndex) {
      entryModule = entryModules[ms]
    }
  }

  const {
    output = {}
  } = config
  const filename = dealFileName(config, output.fileName, entryModule)
  const filePath = output.path || path.join(process.cwd(), './dist')
  
  dealPath(filePath, () => {
    dealPlugins(config, entryModule)
    fs.writeFile(absoltePath(filePath, filename), template(modules[ENTRY_PATH].content,ENTRY_PATH), 'utf-8', (err) => {
      if (err) return console.log(colors.red(err))
      const newDate = +new Date()
      console.log(colors.green(`Build Complete in ${(newDate - oldDate) / 1000}s`))
    })
  })
}

exports.modules = modules

module.exports = parseModule