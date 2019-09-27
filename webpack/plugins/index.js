module.exports = function dealPlugins(config = {}, modules) {
  const {
    plugins = []
  } = config

  plugins.forEach(plugin => {
    plugin.init(modules, config)
  })
}