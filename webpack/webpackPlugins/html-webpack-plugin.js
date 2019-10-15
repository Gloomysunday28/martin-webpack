const path = require('path')
const fs = require('fs')
const colors = require('colors')
const { absoltePath } = require('../path')

class HTMLWebpackPlugin {
  constructor(option = {}) {
    this.option = option
  }
  init(modules, config) {
    this.getInitOption(this.option, config.output)
    let readFileString = fs.readFileSync(this.template, {encoding: 'utf8'}).toString()

    const scripts = Object.values(modules).map(v => v.parseFileName)

    const baseDirName = path.dirname(config.output.path) === process.cwd() ? path.join('./') : path.join(path.basename(config.output.path))

    readFileString = readFileString.split('</body>').join(`  ${scripts.map(parseFileName => (`<script src="${path.join(baseDirName, path.join(parseFileName))}"></script>`)).join('\n  ')}
</body>`)

    fs.writeFileSync(this.targetHTML, readFileString, 'utf-8')
  }
  getInitOption(option, output = {}) {
    this.template = option.template ? absoltePath(option.template) : absoltePath(process.cwd(), './index.html')
    this.targetHTML = absoltePath(`${process.cwd() + '/dist'}`, `${this.option.file || 'index.html'}`)
    if (!fs.existsSync(this.template)) return console.log(colors.red(`${this.template} is no Exist`))

    this.templateHTML = fs.readFileSync(this.template, 'utf-8')
  }
}

HTMLWebpackPlugin.install = {
  install(MWebpack) {
    MWebpack.prototype.HTMLWebpackPlugin = HTMLWebpackPlugin
  }
}

module.exports = HTMLWebpackPlugin
