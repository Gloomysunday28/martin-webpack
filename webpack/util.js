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
    // console.log(file);
    return file + (path.extname(file) ? '' : '.js')
  },
  dealFileName(config, filename = '', entryModule) {
    const {
      entry,
      output = {}
    } = config

    let originEntry = entry
    let targetName = ''

    if (!output.fileName || (output.fileName || '').includes('[name]')) {
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
          targetName = filename
          break
      }
    } else {
      targetName = output.fileName
    }

    if (filename.includes('[hash]')) {
      const file = fs.readFileSync(absoltePath(originEntry), 'utf-8').toString()
      const hash = crypto.createHash('md5');
      hash.update(file)
      targetName += ('.' + hash.digest('hex'))
    }
    entryModule.parseFileName = targetName + (targetName.includes('.js') ? '' : '.js')
    return entryModule.parseFileName
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
  },
  warn(msg) {
    console.log(colors.red(`[Mwebpack Warn]: ${msg}`))
  }
}
