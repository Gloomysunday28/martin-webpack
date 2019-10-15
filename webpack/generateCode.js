const fs = require('fs')
const path = require('path')
const dealPlugins = require('./plugins')
const { absoltePath } = require('./path')
const { template } = require('./template')
const { dealPath, dealFileName, success } = require('./util')

/**
 * @description 初始打包时进行目录建设，mkdir无法建立多个未出现的层级的目录
 */
const dealPrinfFile = () => {
  let printFileIndex = 0
  return function printFile(dirPaths, pPath = process.cwd()) {
    const filePath = path.join(pPath, dirPaths[printFileIndex])
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath)
      if (printFileIndex < dirPaths.length - 1) {
        printFileIndex++
        printFile(dirPaths, filePath)
      }
    }
  }
}

/**
 * @description 根据现有的AST树生成代码并输出文件
 * @param {*} astTree 
 * @param {*} content 
 * @param {*} ENTRY_PATH 
 */

 function generateCode(modules, option, oldDate, MWebpack, cb) {
  const {
    output = {}
  } = option

  const filePath = (output.path || path.join(process.cwd(), './dist/js')).replace('\\', '\\').replace(process.cwd(), '')
  
  dealPath(path.join(process.cwd(), filePath.split('\\')[1]), () => {
    const dirPaths = filePath.split('\\').filter(Boolean)
    const printFile = dealPrinfFile()

    printFile(dirPaths)
    Promise.resolve(
      Object.keys(modules).forEach(modePath => {
        const mode = modules[modePath]
        const filename = dealFileName(option, output.fileName, mode, modePath)
        const basename = absoltePath(process.cwd(), filePath, filename)
        fs.writeFileSync(basename, template(mode.content, modePath), 'utf-8')
      })
    ).then(() => {
      dealPlugins(modules, option, MWebpack)
     
      const newDate = +new Date()
      success(`Build All Modules Complete in ${(newDate - oldDate) / 1000}s`)
      cb && cb()
    })
  })
}

module.exports = generateCode