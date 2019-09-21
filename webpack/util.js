const fs = require('fs')

module.exports = {
  isFileExist(path) {
    return fs.existsSync(path)
  }
}
