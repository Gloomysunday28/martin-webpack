#!/usr/bin/env node

const date = +new Date()
const fs = require('fs')
const commander = require('commander')
const defaultOption = require('./defaultOption')
const { parseModule } = require('./parseModule')
const { absoltePath } = require('./path')

commander
  .version('0.0.1')
  .option('-c, --config [n]', 'output your config option')

const program = commander.parse(process.argv)

const {
  config = 'martin-webpack.conf.js'
} = program

let option = defaultOption

if (fs.existsSync(absoltePath(config))) {
  option = require(absoltePath(config))
}

parseModule(option, true, date)
  