# 模仿webpack打包工具martin-webpack

## 前言
```
  webpack已经逐渐成为了主流的打包工具，它对于项目的管理具有极大的帮助，martin-webapck是根据webpack打包出来的代码进行自定义处理，是一个简易的打包工具:zap:
```

## 完成功能
- [x] 最基础的打包: 不引入模块, 单文件打包 :wink:
- [x] 引入模块 :wink:
- [x] 自制插件 :wink:

## 安装
```
  npm i @kvinc/acorn-webpack -g
```

## 命令行
```
  mwebpack --config xxx
```

## 配置文件
属性 | 类型 | 说明
:---:| :---: | :---:
entry | <code>String</code><code>Array</code><code>Object</code> | 打包文件的入口
output | {path: path, fileName: fileName} | 打包文件的出口, path为出口的路径, fileName为输出文件名称, 支持[name].[hash].js, name为main或者是对象的key, hash是文件内容的哈希值
plugins | Array | 插件

## 自制插件
```
  允许用户自制插件
  插件格式:
    1. 必须是构造函数
    2. 原型下具有init方法
      参数:
        modules: 文件解析出来的一些信息
        config: mwebpack配置文件
```

## 零配置插件
``` javascript
  // 允许用户不用指定配置文件, mwebapck内部集成了初始配置
  const HTMLWebpackPlugin = require('./plugins/html-webpack-plugin')
  module.exports = {
    entry: {
    'app' : './src/index.js'
    },
    output: {
      fileName: '[name].[hash].js'
    },
    plugins: [
      new HTMLWebpackPlugin()
    ]
  }
```