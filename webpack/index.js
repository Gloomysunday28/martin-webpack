#!/usr/bin/env node

const date = +new Date()
const fs = require('fs')
const commander = require('commander')
const defaultOption = require('./defaultOption')
const { parseModule, modules } = require('./parseModule')
const { absoltePath } = require('./path')

const generateCode = require('./generateCode')

commander
  .version('0.0.1')
  .option('-c, --config [n]', 'output your config option')

const program = commander.parse(process.argv)

const {
  config = 'martin-webpack.conf.js'
} = program

let option = defaultOption

if (fs.existsSync(absoltePath(process.cwd(), config))) {
  option = require(absoltePath(process.cwd(), config))
}

const {
  entry
} = option

if (Array.isArray(entry)) {
  entry.forEach(e => {
    parseModule({
      ...option,
      entry: e
    }, true, date)
  })
} else if (Object.prototype.toString.call(entry) === '[object Object]') {
  Object.values(entry).forEach(e => parseModule({
    ...option,
    entry: e
  }, true, date))
} else {
  parseModule(option, true, date)
}

generateCode(modules, option)
