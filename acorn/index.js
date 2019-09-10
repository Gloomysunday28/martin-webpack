const acorn = require('acorn')

acorn.parse('1 + 1', {
  onInsertedSemicolon(e) { // 插入分号时的回调
    console.log(1231231, e);
  },
  
})