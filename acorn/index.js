const acorn = require('acorn')
const template = require('./template')
console.log(template);
const parseParam = acorn.parse(template.a, {
  onInsertedSemicolon(e) { // 插入分号时的回调
    console.log(1231231, e);
  },
  onTrailingComma(e) {
    console.log(333, e);
  },
  allowReserved: true, // 允许使用保留字和关键字不能作为属性名称
  allowReturnOutsideFunction: true, // 默认情况下 return语句是不能出现在顶级作用域内，当为true时, 可以接受该语法
})

console.log(parseParam.body);