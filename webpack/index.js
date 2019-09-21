const fs = require('fs')
const colors = require('colors')
const commander = require('commander')
const { parseModule } = require('./parseModule')
const { absoltePath } = require('./path')

commander
  .version('0.0.1')
  .option('-c, --config [n]', 'output your config option')

const program = commander.parse(process.argv)

const {
  config = 'martin-webpack.conf.js'
} = program

if (fs.existsSync(absoltePath(config))) {
  const option = require(absoltePath(config))
  parseModule(option)
} else {
  const config1 = {
    entry: './index.js'
  }

  parseModule(config1)

  // console.log(colors.red.underline(`file ${config1} is no exist`))
}