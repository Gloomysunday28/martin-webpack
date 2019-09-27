const path = require('path')
const fs = require('fs')
const colors = require('colors')
const rimraf = require('rimraf')

module.exports = {
  isFileExist(path) {
    return fs.existsSync(path)
  },
  getExt(file) {
    return file + (path.extname(file) ? '' : '.js')
  },
  dealFileName(entry, filename = '') {
    if (filename.includes('[')) {
      switch (Object.prototype.toString.call(entry)) {
        case '[object String]':
          return 'main.js'
        case '[object Array]':
          return 'main.js'
        case '[object Object]':
          for (let key in entry) {
            return `${key}.js`
          }
        default:
          return
      }
    } else {
      return filename
    }
  },
  dealPath(filePath, cb) {
    rimraf(filePath, (err) => {
      if (!err) {
        console.log(colors.green(`${filePath} is clear`))
        fs.mkdir(filePath, {
          recursive: false
        }, () => {
          cb && cb()
        })
      }
    })
  }
}
