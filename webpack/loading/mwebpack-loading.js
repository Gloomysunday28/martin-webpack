const loadStyle = require('./loading.json')
let timer = null

module.exports = {
  start(type) {
    process.stdout.clearLine()
    const loadType = loadStyle[type]
    let index = 0
    timer = setInterval(() => {
      index = ++index % loadType.frames.length
      process.stdout.write(`\r${loadType.frames[index]}`)
    }, loadType.interval);
  },
  stop() {
    clearInterval(timer)
    timer = null
  }
}