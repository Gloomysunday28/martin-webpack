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
  parseModule(option, isIndex) {
    const {
      entry,
      context = ''
    } = option
    
    const ENTRY_PATH = absoltePath(context, getExt(entry))
    
    if (isFileExist(ENTRY_PATH)) {
      const content = fs.readFileSync(ENTRY_PATH, 'utf-8')
      
      const ast = parse(content, {
        sourceType: 'module'
      })

      modules[entry] = {
        path: getExt(entry),
        originPath: entry,
        absoltePath: ENTRY_PATH,
        modules: [],
        exports: [],
        ...isIndex && {isIndex}
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

  let importTree = {}

  body.forEach(ast => {
    switch (ast.type) {
      case 'ImportDeclaration':
        const template = importSingleTemplate(ast.specifiers[0].local.name, ast.source.value)
        
        importTree = {
          path: ast.source.value,
          beforeVar: ast.specifiers[0].local.name,
          afterVar: template.variable,
          importContent: template.content
        }
        modules[ENTRY_PATH].modules.push(importTree)
        transformTemplate = importTemplate
        break;
      case 'ExportDefaultDeclaration':
        console.log(123, ast.declaration);
        
        const exportTree = {
          name: ast.declaration.name,
          value: ast.declaration.extra ? ast.declaration.extra.raw : undefined
        }
        modules[ENTRY_PATH].exports.push({default: exportTree})
        
        getExportVariable(ast, exportTree, modules[ENTRY_PATH].modules, content)
        content = generate(astTree, {}, content).code
        console.log('content', content);
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

  content = dealWithImport(modules[ENTRY_PATH].modules, content, parseModule.parseModule, modules[ENTRY_PATH].absoltePath)
  content = dealWithExport(modules[ENTRY_PATH].exports, content)
  
  modules[ENTRY_PATH].content = content
  if (modules[ENTRY_PATH].isIndex) {
    generateCode(modules, transformTemplate, modules[ENTRY_PATH].path)
  }
}

/**
 * @description 根据现有的AST树生成代码并输出文件
 * @param {*} astTree 
 * @param {*} content 
 * @param {*} ENTRY_PATH 
 * @param {*} transformTemplate 
 */
function generateCode(modules, transformTemplate, ENTRY_PATH) {
  const content = Object.values(modules).reduce((prev, next) => {
    return `${transformTemplate(JSON.stringify(next.content).replace(/^["|'](.*)["|']$/g, '$1'), next.originPath)},` + prev
  }, '')
  
  fs.writeFileSync(absoltePath('output.js'), template(content,ENTRY_PATH))
}

exports.modules = modules

module.exports = parseModule