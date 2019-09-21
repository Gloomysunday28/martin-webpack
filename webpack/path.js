const path = require('path')

module.exports = {
  absoltePath() {
    return path.join(process.cwd(), ...arguments)
  }
}
