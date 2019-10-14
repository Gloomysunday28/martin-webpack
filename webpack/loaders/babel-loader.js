const {
  parse
} = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const { isFileExist } = require('../util')
const fs = require('fs')

const {
  dealExpression,
  dealWithImport,
  dealWithExport,
  getExportVariable
} = require('../dealAST')

const {
  argvTemlate,
  importTemplate,
  importSingleTemplate,
} = require('../template')

function traverseCode(loaderConfig, callback) {
  const {
    ENTRY_PATH,
    parseModule,
    entryModule,
    modules,
    preTransformEntry
  } = loaderConfig

  // console.log(12313, entryModule);

    if (isFileExist(ENTRY_PATH)) {
      const content = fs.readFileSync(ENTRY_PATH, 'utf-8')
      
      const ast = parse(content, {
        sourceType: 'module'
      })
      // console.log('modules', modules);
      // entryModule[preTransformEntry] = {
      //   path: loaderEntry,  
      //   originPath: preTransformEntry,
      //   absoltePath: ENTRY_PATH,
      //   modules: [],
      //   exports: [],
      //   ...isIndex && {isIndex}
      // }

      traverse(ast, {
        Program(path) {
          assembleContent(modules, entryModule, content, path.node, preTransformEntry, parseModule, callback)
        }
      })
    } else {
      console.log(colors.red(`${ENTRY_PATH} is no Exist`))
    }

    return entryModule
}

function assembleContent(modules, entryModule, content, astTree, ENTRY_PATH, parseModule, callback) {
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

        entryModule.modules.push(importTree)
        transformTemplate = importTemplate
        break;
      case 'ExportDefaultDeclaration':
        const exportTree = {
          name: [],
          value: ast.declaration.extra ? ast.declaration.extra.raw : undefined
        }

        if (entryModule.path === './src/index.js') {
          console.log(ast);
        }
        exportTree.name = getExportVariable(ast, exportTree, entryModule.modules, content),
        entryModule.exports.push({default: exportTree})

        content = generate(astTree, {}, content).code
        break;
      case 'ExportNamedDeclaration':
        const exported = ast.specifiers.ExportSpecifier.local.name
        entryModule.exports.push({[exported]: exported})
        break;
      case 'ExpressionStatement':
        if (dealExpression(ast, entryModule.modules, content)) {
          content = generate(astTree, {}, content).code
        }
        break;
      default:
        break
    }
  })

  content = dealWithImport(entryModule.modules, content, parseModule.parseModule, entryModule.absoltePath)
  content = dealWithExport(entryModule.exports, content)

  entryModule.content = content
  entryModule.transformTemplate = transformTemplate

  if (entryModule.isIndex) {
    generateCode(modules[entryModule.path], entryModule, transformTemplate)
  }
}

/**
 * @description 根据现有的AST树生成代码并输出文件
 * @param {*} astTree 
 * @param {*} content 
 * @param {*} ENTRY_PATH 
 * @param {*} transformTemplate 
 */
function generateCode(modules, entryModule, transformTemplate) {
  const content = Object.values(modules.modules).reduce((prev, next) => {
    return `${transformTemplate(JSON.stringify(next.content || '').replace(/^["|'](.*)["|']$/g, '$1'), next.originPath)},` + prev
  }, '')
  // console.log(content);
  modules.content = content
}

module.exports = traverseCode