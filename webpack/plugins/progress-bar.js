const { success } = require('./util')
const ProgressBar = require('progress');

function ProgressBar(option = {}) {
  this.option = option
}

ProgressBar.prototype = {
  constructor: ProgressBar,
  init(modules, config) {
    const bar = new ProgressBar(':bar :current/:total', { total: 10 });
    var timer = setInterval(function () {
      bar.tick();
      if (bar.complete) {
        clearInterval(timer);
      } else if (bar.curr === 5) {
        success('this message appears above the progress bar\ncurrent progress is ' + bar.curr + '/' + bar.total);
      }
    }, 100);
  }
}

module.exports = ProgressBar