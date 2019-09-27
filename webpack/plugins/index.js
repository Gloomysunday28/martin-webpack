module.exports = function dealPlugins(plugins = []) {
    plugins.forEach(plugin => {
      plugin.init()
    })
}