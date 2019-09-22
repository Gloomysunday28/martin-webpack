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
    if (!Identifier) return
    
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
      ast.declaration.name = findExports.afterVar
      exportTree.afterVar = findExports.afterVar
    }
  },
  dealWithImport(modules, content, parseModules) {
    modules.forEach(importTree => {
      const {
        path,
        importContent,
        beforeVar
      } = importTree
      const reg = new RegExp(`import(.*)${beforeVar}("|')`, 'ig')
      
      content = content.replace(reg, importContent)
      parseModules({
        entry: path
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
      
      content = content.replace(reg, exportSingTemplate(afterVar || value))
    })
    
    return content
  }
}