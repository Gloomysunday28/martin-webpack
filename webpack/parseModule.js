const fs = require('fs')
const acorn = require('acorn')
const colors = require('colors')
const { absoltePath } = require('./path')
const { isFileExist } = require('./util')
const { template, argvTemlate } = require('./template')

const modules = {}

function assembleContent(content, file, ENTRY_PATH) {
  const {
    body = []
  } = file

  body.forEach(ast => {
    if (ast.type === 'ImportDeclaration') {
      modules[ENTRY_PATH].modules.push(ast.source.value)
    } else if (ast.type === 'ExportDefaultDeclaration') {
      modules[ENTRY_PATH].exports.push({default: ast.declaration.name})
    } else if (ast.type === 'ExportNamedDeclaration') {
      const exported = ast.specifiers.ExportSpecifier.local.name
      modules[ENTRY_PATH].exports.push({[exported]: exported})
    }
  })


  const argv = argvTemlate(content.replace(/^["|'](.*)["|']$/g, '$1'), ENTRY_PATH)

  fs.writeFileSync(absoltePath('output.js'), template(argv, ENTRY_PATH))
}

exports.modules = modules

module.exports = {
  parseModule(option) {
    const {
      entry
    } = option

    const ENTRY_PATH = absoltePath(entry)

    if (isFileExist(ENTRY_PATH)) {
      const content = fs.readFileSync(ENTRY_PATH, 'utf-8').toString()

      const file = acorn.parse(content, {
        sourceType: 'module'
      })
      
      modules[entry] = {
        modules: [],
        exports: []
      }
      
      assembleContent(JSON.stringify(content), file, entry)
    } else {
      console.log(colors.red(`${ENTRY_PATH} is no Exist`))
    }
  },
}