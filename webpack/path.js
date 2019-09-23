const path = require('path')

module.exports = {
  absoltePath() {
    return path.join(...arguments)
  }
}
