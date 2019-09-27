const crypto = require('crypto')
const path = require('path')
const fs = require('fs')
const colors = require('colors')
const rimraf = require('rimraf')
const { absoltePath } = require('./path')

module.exports = {
  isFileExist(path) {
    return fs.existsSync(path)
  },
  getExt(file) {
    return file + (path.extname(file) ? '' : '.js')
  },
  dealFileName(config, filename = '', modules) {
    const {
      entry,
      output
    } = config

    const {
      path = ''
    } = output
    
    let originEntry = entry
    let targetName = ''
    if (filename.includes('[name]')) {
      switch (Object.prototype.toString.call(entry)) {
        case '[object String]':
           targetName += 'main'
           break
        case '[object Array]':
           originEntry = entry[0]
           targetName += 'main'
           break
        case '[object Object]':
          for (let key in entry) {
             targetName += `${key}`
             originEntry = entry[key]
             break
          }
          break
        default:
          break
      }
    } else {
      targetName = filename
    }

    const entryModule = modules[originEntry]

    if (filename.includes('[hash]')) {
      const file = fs.readFileSync(absoltePath(originEntry), 'utf-8').toString()
      const hash = crypto.createHash('md5');
      hash.update(file)
      targetName += ('.' + hash.digest('hex'))
    }

    entryModule.parseFileName = targetName + '.js'
    return targetName + '.js'
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
