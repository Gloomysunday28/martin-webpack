const path = require('path')
const http = require('http')
const fs = require('fs')
const open = require('open')
const webpack = require('../index')

const port = 8888

const context = path.join(process.cwd(), './dist')

webpack.generateCode(() => {
  const server = http.createServer((req, res) => {
    const reqUrl = req.url === '/' ? 'index.html' : req.url
  
    const HTML = fs.createReadStream(path.join(context, reqUrl))
    HTML.on('error', (err) => {
      res.end()
    })
  
    HTML.pipe(res)
  })
  
  server.listen(port, () => {
    open(`http://localhost:${port}`)
  })
})

