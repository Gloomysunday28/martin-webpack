const { absoltePath } = require('./path')
const dealLoader = require('./loaders')
const { isFileExist, getExt, warn } = require('./util')

const modules = {}
const config = {}

const parseModule = {
  modules,
  parseModule(option, isIndex) {
    const {
      entry: entrys,
      context = isIndex ? process.cwd() : '',
      module: mModule = {
        rules: [{
          test: /\.js$/,
          loader: 'babel-loader'
        }]
      },
      resolveLoaders
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
      modules[getExt(entry)] = {
        startTime: +new Date(),
        modules: {}
      }
      if (isIndex) {
        Object.assign(config, {...option, ...{
          module: mModule,
          resolveLoaders: resolveLoaders ? ['node_modules'].concat([...[resolveLoaders]]) : ['node_modules']
        }})
      }
    }

    const ENTRY_PATH = absoltePath(context, getExt(entry))

    if (!isFileExist(ENTRY_PATH)) return void warn(`${ENTRY_PATH} is no Exist`)

    modules[getExt(config.entry)].modules[entry] = {
      path: getExt(entry),  
      originPath: entry,
      absoltePath: ENTRY_PATH,
      modules: [],
      exports: [],
      ...isIndex && {isIndex}
    }

    if (!dealLoader(mModule, config, modules, {
      isIndex,
      ENTRY_PATH,
      parseModule,
      entry
    })) return void 0

    return 'Build Complete'
  },
}

module.exports = parseModule