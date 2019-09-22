const path = require('path')
const fs = require('fs')

module.exports = {
  isFileExist(path) {
    return fs.existsSync(path)
  },
  getExt(file) {
    return file + (path.extname(file) ? '' : '.js')
  }
}
