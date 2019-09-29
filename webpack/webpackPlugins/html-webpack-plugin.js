const path = require('path')
const fs = require('fs')
const colors = require('colors')
const { absoltePath } = require('../path')

function HTMLWebpackPlugin(option = {}) {
  this.option = option
}

HTMLWebpackPlugin.prototype = {
  constructor: HTMLWebpackPlugin,
  init(modules, config) {
    this.getInitOption(this.option, config.output)
    let readFileString = fs.readFileSync(this.template, {encoding: 'utf8'}).toString()

    const scripts = Object.values(modules).map(v => v.parseFileName)

    readFileString = readFileString.split('</body>').join(`   ${scripts.map(parseFileName => (`<script src="./${path.join(parseFileName)}"></script>`)).join('\n   ')}
</body>`)

    fs.writeFileSync(this.targetHTML, readFileString, 'utf-8')
  },
  getInitOption(option, output = {}) {
    this.template = option.template ? absoltePath(option.template) : absoltePath(process.cwd(), './index.html')
    this.targetHTML = option.file ? absoltePath(option.file) : absoltePath(`${output.path || process.cwd() + '/dist'}`, `${this.option.file || 'index.html'}`)
    if (!fs.existsSync(this.template)) return console.log(colors.red(`${this.template} is no Exist`))

    this.templateHTML = fs.readFileSync(this.template, 'utf-8')
  }
}

exports.install = {
  install(MWebpack) {
    MWebpack.prototype.HTMLWebpackPlugin = HTMLWebpackPlugin
  }
}

module.exports = HTMLWebpackPlugin
