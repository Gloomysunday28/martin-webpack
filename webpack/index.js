#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const commander = require('commander')
const defaultOption = require('./defaultOption')
const { parseModule, modules } = require('./parseModule')
const { absoltePath } = require('./path')
const install = require('./install')(MWebpack)
const generateCode = require('./generateCode')

commander
  .version('0.0.1')
  .option('-c, --config [n]', 'output your config option')

const program = commander.parse(process.argv)

const {
  config = 'martin-webpack.conf.js'
} = program

let option = defaultOption

function MWebpack(config) {
  this.config = config
  this.startDate = +new Date()
  this.init()
}

MWebpack.prototype = {
  constructor: MWebpack,
  install,
  init() {
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

    this.generateCode()
    this.installPlugins()
  },
  generateCode() {
    if (this.finalBoolean.every(Boolean)) {
      generateCode(modules, option, this.startDate)
    }
  },
  installPlugins(context = './webpack/webpackPlugins') {
    fs.readdir(path.resolve(context), 'utf-8', (err, files) => {
      files.forEach(file => {
        const plugin = require(path.resolve(context, file))
        install(plugin.install)
      })
    })
  }
}

const webpack = new MWebpack(option)

module.exports = webpack