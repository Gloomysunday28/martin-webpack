module.exports = function dealPlugins(modules, config = {}) {
  const {
    plugins = []
  } = config

  plugins.forEach(plugin => {
    plugin.init(modules, config)
  })
}