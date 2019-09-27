const path = require('path')
const fs = require('fs')
const colors = require('colors')
const { absoltePath } = require('../path')

function HTMLWebpackPlugin(option = {}) {
  this.option = option
}

HTMLWebpackPlugin.prototype = {
  constructor: HTMLWebpackPlugin,
  init(modules) {
    this.getInitOption(this.option)
    let readFileString = fs.readFileSync(this.template, {encoding: 'utf8'}).toString()
    const {
      parseFileName
    } = modules
    readFileString = readFileString.split('</body>').join(`   <script src="${path.join(parseFileName)}"></script>
</body>`)
    fs.writeFile(this.targetHTML, readFileString, 'utf-8' ,err => {
    })
  },
  getInitOption(option) {
    this.template = option.template ? absoltePath(option.template) : absoltePath(process.cwd(), './index.html')
    this.targetHTML = option.file ? absoltePath(option.file) : absoltePath(process.cwd(), './dist/index.html')
    
    if (!fs.existsSync(this.template)) return console.log(colors.red(`${this.template} is no Exist`))

    this.templateHTML = fs.readFileSync(this.template, 'utf-8')
  }
}


module.exports = HTMLWebpackPlugin
