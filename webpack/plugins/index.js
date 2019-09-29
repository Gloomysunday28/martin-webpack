module.exports = function dealPlugins(modules, config = {}, MWebpack) {
  const {
    plugins = []
  } = config

  plugins.forEach(plugin => {
    plugin.init(modules, config, MWebpack)
  })
}