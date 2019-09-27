module.exports = function dealPlugins(plugins = [], config) {
    plugins.forEach(plugin => {
      plugin.init(config)
    })
}