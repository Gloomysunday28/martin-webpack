const path = require('path')
const {
  exportSingTemplate
} = require('./template')

module.exports = {
  /**
   * @description 处理AST树下表达式
   * @param {Object} expression 表达式AST树
   */
  dealExpression(ast, modulesTree) {
    const {
      arguments: expressArg = []
    } = ast.expression
    
    const Identifier = expressArg.find(v => v.type === 'Identifier')
    if (!Identifier || !modulesTree.length) return
    
    const findData = modulesTree.find(v => v.beforeVar === Identifier.name)
    if (findData) {
      Identifier.name = findData.afterVar
    }
    
    return ast
  },
  getExportVariable(ast, exportTree, importCollection) {
    const {
      name
    } = exportTree

    if (name) {
      const findExports = importCollection.find(v => v.beforeVar === name)
      
      if (findExports) {
        ast.declaration.name = findExports.afterVar
        exportTree.afterVar = findExports.afterVar
      }
    }
  },
  dealWithImport(modules, content, parseModules, context) {
    modules.forEach(importTree => {
      const {
        path: entryPath,
        importContent,
        beforeVar
      } = importTree
      const reg = new RegExp(`import(.*)${beforeVar}("|')`, 'ig')
      
      content = content.replace(reg, importContent)
      console.log(context);
      parseModules({
        entry: entryPath,
        context: path.dirname(context)
      })
    })
    
    return content
  },
  dealWithExport(modules, content) {
    modules.forEach(exportTree => {
      const {
        name,
        value,
        afterVar,
      } = exportTree.default

      const reg = new RegExp(`export(.*)${name || value}("|')?`, 'ig')
      
      content = content.replace(reg, exportSingTemplate(afterVar || name || value))
    })
    
    return content
  }
}