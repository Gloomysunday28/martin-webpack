const fs = require('fs')
const path = require('path')
const colors = require('colors')
const { absoltePath } = require('./path')
const dealLoader = require('./loaders')
const { isFileExist, getExt, dealFileName, dealPath, warn } = require('./util')
const {
  template,
} = require('./template')

const modules = {}
const config = {}
let oldDate = 0

const parseModule = {
  modules,
  parseModule(option, isIndex, date) {
    const {
      entry: entrys,
      context = isIndex ? process.cwd() : '',
      module: mModule = {
        rules: [{
          test: /\.js$/,
          loader: 'babel-loader'
        }]
      },
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
        Object.assign(config, {...option, ...{
          module: mModule,
          resolveLoaders
        }})
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
  },
}

module.exports = parseModule