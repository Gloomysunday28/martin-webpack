const fs = require('fs')
const {
  parse
} = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const types = require('@babel/types')
const colors = require('colors')
const { absoltePath } = require('./path')
const { isFileExist, getExt } = require('./util')
const {
  template,
  argvTemlate,
  importTemplate,
  importSingleTemplate,
} = require('./template')

const {
  dealExpression,
  dealWithImport,
  dealWithExport,
  getExportVariable
} = require('./dealAST')

const modules = {}

const parseModule = {
  parseModule(option) {
    const {
      entry
    } = option

    const ENTRY_PATH = absoltePath(getExt(entry))
    console.log('ENTRY_PATH', ENTRY_PATH);
    
    if (isFileExist(ENTRY_PATH)) {
      const content = fs.readFileSync(ENTRY_PATH, 'utf-8')
      
      const ast = parse(content, {
        sourceType: 'module'
      })

      modules[entry] = {
        modules: [],
        exports: []
      }

      traverse(ast, {
        Program(path) {
          assembleContent(content, path.node, entry)
        }
      })
      
    } else {
      console.log(colors.red(`${ENTRY_PATH} is no Exist`))
    }
  },
}

function assembleContent(content, astTree, ENTRY_PATH) {
  const {
    body = []
  } = astTree

  let transformTemplate = argvTemlate

  body.forEach(ast => {
    switch (ast.type) {
      case 'ImportDeclaration':
        const template = importSingleTemplate(ast.specifiers[0].local.name, ast.source.value)
        
        const importTree = {
          path: ast.source.value,
          beforeVar: ast.specifiers[0].local.name,
          afterVar: template.variable,
          importContent: template.content
        }
        modules[ENTRY_PATH].modules.push(importTree)
        transformTemplate = importTemplate
        break;
      case 'ExportDefaultDeclaration':
        const exportTree = {
          name: ast.declaration.name,
          value: ast.declaration.value
        }
        modules[ENTRY_PATH].exports.push({default: exportTree})
        getExportVariable(ast, exportTree, modules[ENTRY_PATH].modules, content)
        content = generate(astTree, {}, content).code
        break;
      case 'ExportNamedDeclaration':
        const exported = ast.specifiers.ExportSpecifier.local.name
        modules[ENTRY_PATH].exports.push({[exported]: exported})
        break;
      case 'ExpressionStatement':
        if (dealExpression(ast, modules[ENTRY_PATH].modules, content)) {
          content = generate(astTree, {}, content).code
        }
        break;
      default:
        break
    }
  })

  content = dealWithImport(modules[ENTRY_PATH].modules, content, parseModule.parseModule)
  content = dealWithExport(modules[ENTRY_PATH].exports, content)
  
  generateCode(content, ENTRY_PATH, transformTemplate)
}

/**
 * @description 根据现有的AST树生成代码并输出文件
 * @param {*} astTree 
 * @param {*} content 
 * @param {*} ENTRY_PATH 
 * @param {*} transformTemplate 
 */
function generateCode(content, ENTRY_PATH, transformTemplate) {
  const argv = transformTemplate(JSON.stringify(content).replace(/^["|'](.*)["|']$/g, '$1'), ENTRY_PATH)
  
  fs.writeFileSync(absoltePath('output.js'), template(argv, ENTRY_PATH))
}

exports.modules = modules

module.exports = parseModule