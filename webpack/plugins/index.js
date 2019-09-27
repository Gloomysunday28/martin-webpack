module.exports = function dealPlugins(plugins = [], modules) {
    plugins.forEach(plugin => {
      plugin.init(modules)
    })
}