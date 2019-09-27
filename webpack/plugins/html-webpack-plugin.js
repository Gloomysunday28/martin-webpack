const path = require('path')
const fs = require('fs')
const colors = require('colors')
const { absoltePath } = require('../path')

const defaultOption = {
  template: absoltePath(process.cwd(), './index.html'),
  file: absoltePath(process.cwd(), './dist/index.html'),
}

function HTMLWebpackPlugin(option = {}) {
  this.template = option.template ? absoltePath(option.template) : defaultOption.template
  this.targetHTML = option.file ? absoltePath(option.file) : defaultOption.file
  if (!fs.existsSync(this.template)) return console.log(colors.red(`${this.template} is no Exist`))

  this.templateHTML = fs.readFileSync(this.template, 'utf-8')
}

HTMLWebpackPlugin.prototype = {
  constructor: HTMLWebpackPlugin,
  init(modules) {
    let readFileString = fs.readFileSync(this.template, {encoding: 'utf8'}).toString()
    const {
      parseFileName
    } = modules
    
    readFileString = readFileString.split('</body>').join(`   <script src="${path.join(__dirname, parseFileName)}"></script>
</body>`)
    fs.writeFile(this.targetHTML, readFileString, 'utf-8' ,err => {
    })
  }
}


module.exports = HTMLWebpackPlugin
