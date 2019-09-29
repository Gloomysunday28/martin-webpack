const fs = require('fs')
const path = require('path')
const dealPlugins = require('./plugins')
const { absoltePath } = require('./path')
const { template } = require('./template')
const {dealPath, dealFileName, warn} = require('./util')

/**
 * @description 根据现有的AST树生成代码并输出文件
 * @param {*} astTree 
 * @param {*} content 
 * @param {*} ENTRY_PATH 
 */

 function generateCode(modules, option) {
  // let entryModule

  // for (let ms in entryModules) {
  //   if (entryModules[ms].isIndex) {
  //     entryModule = entryModules[ms]
  //   }
  // }

  const {
    output = {}
  } = option
  
  const filePath = output.path || path.join(process.cwd(), './dist')
  
  dealPath(filePath, () => {
    Object.keys(modules).forEach(modePath => {
      const mode = modules[modePath]
      const filename = dealFileName(option, output.fileName, mode, modePath)
      fs.writeFile(absoltePath(filePath, filename), template(mode.content, modePath), 'utf-8', (err) => {
        if (err) return warn(err)
        // const newDate = +new Date()
        // console.log(colors.green(`Build Complete in ${(newDate - oldDate) / 1000}s`))
      })
    })
    dealPlugins(modules, option)
  })
}

module.exports = generateCode