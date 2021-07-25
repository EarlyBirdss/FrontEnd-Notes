### Webpack5

#### 介绍
* 静态模块打包工具，当webpack处理应用程序时，会在内部构建一个依赖图，依赖图对应映射到项目所需的每个模块，生成一个或多个bundle
* 从v4.0.0开始，webpack可以不用引入配置文件来打包，但依然可以是配置的

#### 核心概念
* 入口 entry
  * 从入口文件开始构建依赖图
  * 默认值 ./src/index.js
* 输出 output
  * 输入bundle的位置
  * 默认值 ./dist/main.js
* loader
  * webpack只能直接处理js文件和json文件，其他类型的文件需要交给loader处理
  * load有两个属性
    * test: 匹配文件
    * use: 使用哪个loader

  * 插件 plugin
  * loader只能处理类型文件转换，而更多的场景只能插件才能完成，如优化打包、资源管理、注入环境变量
  *  plugins: [new somePlugins()]
* 模式 mode
  * 取值为：development\production\none

#### 入口起点

#### 输出

#### loader
* 一个匹配中的多个loader从右到左（从下到上）执行
* loader特性
  * loader支持链式调用
  * 可以同步可以异步
  * loader可以产生任意文件

#### plugin
* 是webpack的支柱功能

#### 配置

#### 模块
* 在模块化编程中，开发者将程序分解为功能离散的chunk，成为模块
* 精心编写的模块提供了可靠的边界和封装界限，便于验证。

(原文链接)[https://webpack.docschina.org]

2021.07.25