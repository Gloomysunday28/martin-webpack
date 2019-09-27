const fs = require('fs')
const path = require('path')
const {
  parse
} = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const colors = require('colors')
const { absoltePath } = require('./path')
const dealPlugins = require('./plugins')
const { isFileExist, getExt, dealFileName, dealPath } = require('./util')
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
const config = {}
let oldDate = 0

const parseModule = {
  parseModule(option, isIndex, date) {
    const {
      entry: entrys,
      context = '',
    } = option

    let entry = entrys

    if (Object.prototype.toString.call(entrys) === '[object Object]') {
      for (let i in entrys) {
        entry = entry[i]
      }
    } else if (Array.isArray(entrys)) {
      entry = entrys[0]
    }

    if (!config.output && isIndex) {
      Object.assign(config, {...option})
    }

    date && (oldDate = date)

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
        const exportTree = {
          name: [],
          value: ast.declaration.extra ? ast.declaration.extra.raw : undefined
        }

        exportTree.name = getExportVariable(ast, exportTree, modules[ENTRY_PATH].modules, content),
        modules[ENTRY_PATH].exports.push({default: exportTree})

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

  let entryModule

  for (let ms in modules) {
    if (modules[ms].isIndex) {
      entryModule = modules[ms]
    }
  }
  
  const {
    output = {}
  } = config
  const filename = dealFileName(config, output.fileName, entryModule)
  const filePath = output.path || path.join(process.cwd(), './dist')

  dealPath(filePath, () => {
    dealPlugins(config, entryModule)
    fs.writeFile(absoltePath(filePath, filename), template(content,ENTRY_PATH), 'utf-8', (err) => {
      if (err) return console.log(colors.red(err))
      const newDate = +new Date()
      console.log(colors.green(`Build Complete in ${(newDate - oldDate) / 1000}s`))
    })
  })
}

exports.modules = modules

module.exports = parseModule