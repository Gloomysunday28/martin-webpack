const fs = require('fs')
const path = require('path')
const dealPlugins = require('./plugins')
const { absoltePath } = require('./path')
const { template } = require('./template')
const { dealPath, dealFileName, success } = require('./util')

/**
 * @description 根据现有的AST树生成代码并输出文件
 * @param {*} astTree 
 * @param {*} content 
 * @param {*} ENTRY_PATH 
 */

 function generateCode(modules, option, oldDate, MWebpack) {
  const {
    output = {}
  } = option
  
  const filePath = output.path || path.join(process.cwd(), './dist/js')
  
  dealPath(filePath, () => {
    Promise.resolve(
      Object.keys(modules).forEach(modePath => {
        const mode = modules[modePath]
        const filename = dealFileName(option, output.fileName, mode, modePath)
        fs.writeFileSync(absoltePath(filePath, filename), template(mode.content, modePath), 'utf-8')
      })
    ).then(() => {
      dealPlugins(modules, option, MWebpack)

      const newDate = +new Date()
      success(`Build All Modules Complete in ${(newDate - oldDate) / 1000}s`)
    })
  })
}

module.exports = generateCode