#!/usr/bin/env node

const fs = require('fs')
const commander = require('commander')
const defaultOption = require('./defaultOption')
const { parseModule, modules } = require('./parseModule')
const { absoltePath } = require('./path')
const install = require('./install')(MWebpack)
const generateCode = require('./generateCode')
const {
  start
} = require('./loading/mwebpack-loading.js')

commander
  .version('0.0.1')
  .option('-c, --config [n]', 'output your config option')
  .option('-l, --lt [n]', 'output your config option')

const program = commander.parse(process.argv)

const {
  config = 'martin-webpack.conf.js',
  lt = 'bouncingBall'
} = program

let option = defaultOption

function MWebpack(config) {
  this.config = config
  this.startDate = +new Date()
}

MWebpack.prototype = {
  constructor: MWebpack,
  install,
  init(mode, cb) {
    start(lt)
    
    if (fs.existsSync(absoltePath(process.cwd(), config))) {
      option = require(absoltePath(process.cwd(), config))
    }
    
    const {
      entry
    } = option
    
    if (Array.isArray(entry)) {
      this.finalBoolean = entry.map(e => {
        parseModule({
          ...option,
          entry: e
        }, true)
      })
    } else if (Object.prototype.toString.call(entry) === '[object Object]') {
      this.finalBoolean = Object.values(entry).map(e => parseModule({
        ...option,
        entry: e
      }, true))
    } else {
      this.finalBoolean = [parseModule(option, true)]
    }

    this.installPlugins()
    if (mode === 'production') {
      this.generateCode(cb)
    }
  },
  generateCode(cb) {
    if (this.finalBoolean.every(Boolean)) {
      generateCode(modules, option, this.startDate, this, () => {
        cb && cb()
      })
    }
  },
  installPlugins(context = './webpackPlugins') {
    const files = fs.readdirSync(absoltePath(__dirname, context), 'utf-8')

    files.forEach(file => {
      const plugin = require(absoltePath(__dirname, context, file))
      install(plugin.install)
    })
  }
}

const webpack = new MWebpack(option)

module.exports = webpack
exports.program = program