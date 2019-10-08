const { success } = require('./util')
const ProgressBars = require('progress');

class ProgressBar {
  constructor(option) {
    this.option = option
  }
  init(modules, config) {
    const bar = new ProgressBars(':bar :current/:total', { total: 10 });
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