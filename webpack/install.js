function install(mWebpack) {
  return function(indentifer) {
    if (typeof indentifer === 'function') {
      indentifer && indentifer(mWebpack)
    } else if (Object.prototype.toString.call(indentifer) === '[object Object]' && typeof indentifer.install === 'function') {
      indentifer.install && indentifer.install(mWebpack)
    }
  }
}

module.exports = install