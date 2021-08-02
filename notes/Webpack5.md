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
* webpack模块有哪些？
  * ES2015 import()
  * Commonjs require()
  * AMD define require
  * css/sass/less @import
  * stylesheet url() / HTML `<img src="">`
* 支持的模块类型
  * ECMAScript
  * CommonJS
  * AMD
  * Assets
  * WebAssembly

#### 模块解析
* resolver: 帮助寻找模块绝对路径的库
* 解析规则 enhanced-resolve
  * 绝对路径
  * 相对路径
  * 模块路径（需要配置模块别名，resolve.alias）
* 解析流程
  1. 解析路径
  2. resolver检查路径指向文件还是文件夹，如果路径指向文件，那么：
      1. 如果文件具有扩展名，则直接将文件打包
      2. 否则使用resolver.extensions选项作为文件扩展名来解析，该选项在告诉解析器可以接受哪些扩展名（一般.js, .jsx, .ts, .tsx）
  3. 如果指向文件夹，则根据以下规则寻找具有正确扩展名的文件
      1. 如果文件夹存在package.json，则会根据resolve.mainFields配置的字段顺序查找，会根据package.json中符合配置要求的第一个字段来确定文件路径
      2. 如果不存在package.json或resolve.mainFields没有有效的返回路径，则会根据resolve.mainFields配置选项的指定文件顺序查找，看能否在import/require的目录下匹配一个存在的文件名
      3. 使用resolve.extendsions选项，以类似的方式解析文件扩展名
* 解析loader
  * 也遵循特定的流程，resolver可以为loader设置独立的解析规则
* 缓存
  * 每次文件系统访问文件都会被缓存，以便更快的触发对同一文件的并行或串行请求
  * 在watch模式下，只有修改的文件才会移出缓存。在非watch模式下，每次编译前都会清理缓存


#### module federation
* 动机
  * 多个独立的构建可以组成应用程序。不存在依赖关系，因此可以单独开发和部署。微前端应用
* 底层概念
  * 区分“本地模块“（当前构建）和”远程模块“（不属于当前构建，运行时从容器加载）
  * 远程模块，是异步操作，被放在远程模块和入口之间的下一个chunk加载操作中。如果没有chunk加载操作，就不能使用远程模块
  * chunk的加载操作通常是通过import实现的，也支持想require.ensure或require([...])之类的旧语法
  * 容器是由容器入口创建的，入口暴露来对特定模块的异步访问，暴露的访问分为两个步骤：1. 加载模块（异步，chunk加载期间完成） 2. 执行模块（同步，在与其他模块交错执行期间完成）
* 高级概念
  * 每个构建都充当一个容器，也可以将其他构建当作容器。每个构建都可以通过容器中加载模块来访问其他容器暴露出来的模块。
  * 共享模块是指即可重写又可以作为嵌套容器提供重写的模块。通常是相同的库。
  * packageName选项允许通过设置包名查找需要的版本，默认自动推断模块请求。可以通过设置requiredVision禁用
* 构建块(building blocks)
  * containerPlugin 指定特定的公开模块来创建一个额外的容器入口
  * containerReferencePlugin 指定特定的引用添加到作为外部资源的容器中，并允许这些容器倒入远程模块
  * moduleFerationPlugin 组合了containerPlugin 和 containerReferencePlugin
* 概念目标
  * 
* 用例
  * 每个页面单独构建
    * 主体应用程序（将常用库作为共享模块） + 每个页面单独构建、部署。主体应用程序将每个页面作为远程模块来引用。更新、添加路由时，部署主体程序。
  * 将组件库作为容器
    * 多个应用程序共享一个组件库，构建为暴露所有组件的容器。只需要部署组件库的改动，应用程序自动使用组件库最新版本。
* 动态远程容器
  * 容器
* 基于promise的动态remote
* 动态public Path
  * 

#### 依赖图
* 从入口文件出发，递归的构建一个依赖关系图，这个依赖关系图包含应用程序所需的每个模块，然后将所有模块打包为bundle

#### target
* js即可编写浏览器代码也可以编写服务端，target可以设置部署目标
* 默认值为web。如果将target设置为node，webpack将在类node环境编译。例如，require一个chunk，可以不引入fs或path
* 多target
  * 通过设置两个独立配置

#### manifest
使用了webpack构建的应用，有三种代码：
* 自己编写的代码
* 引用的库
* webpack的runtime和manifest: webpack用来连接模块化应用程序所需要的代码，包含：在模块交互时，连接模块所需要的加载和解析逻辑（已加载的和延迟加载的逻辑）。

mainifest
* 是一个数据集：包含compile在执行解析和映射应用程序是时，模块的详细要点，以便在自己编写的代码中import变成_webpack_require_后webpack还能找到正确的模块

由于打包后的bundle文件包含runtime和mainfest，每次编译后都会改变，因此即使你没有修改你的代码，重新编译后请求的bundle文件缓存也是失效的。

#### 模块热替换（hot module replacement）
* 无需重新加载页面，热替换功能可以添加、修改、删除模块
* 原理：
    * 在应用程序中，可以在应用程序中置换模块
      * 应用程序要求HMR runtime检查更新（webpack配置）
      * HMR异步下载更新，并通知应用程序
      * 应用程序要求HMR runtime应用更新
      * HRM同步更新应用
  * 在compiler中
    * 发出一个update，由两个部分组成。
      1. 更新后的manifest
      2. 一个或多个update chunk
  * 在模块中
    * 需要实现HMR的接口，例如style-loader
    * HMR是可选的，如果模块没有HMR处理函数，更新就会冒泡
  * 在runtime中
    * check方法：请求manifest，比较updated chunk和loaded chunk，下载updated chunk，下载完成后，进入ready状态
    * apply方法：向父模块冒泡寻找updated module的update handler，如果没有handler则依次标记为无效。找到handler后将所有的无效module处理，runtime置为idle状态
* 将HMR替换liveReload，webpack-dev-server支持hot模式

#### 为什么选择webpack
* webpack之前有两种方式
  * 加载多个脚本，造成网络瓶颈
  * 打包成一个大的js文件。有作用域、文件大小、可读性等问题
* node.js时代
  * node.js: webpack运行环境
  * commonJS: require
* npm + Node.js + modules 大规模分发模块
  * 浏览器不支持commonJS，因此 Browserify, RequireJS 和 SystemJS 替代可以在浏览器中执行commonJS模块
* ESM - ECMAScript
  * 增加模块支持

#### 揭示内部原理
* 输入和输出之间：模块、入口起点、chunk、chunk组和其他
* 主要部分
  * 一个文件就是一个模块
  * 通过互相引入，这些模块会形成一个图的结构
  * 在打包的过程中，模块会被合并成chunk，chunk合并成chunk组，并形成一个模块相互引用的图
* chunk
  * 有两种形式
    * initial： 入口起点的main chunk，包含为入口起点指定的所有模块及其依赖项
    * non-initial: 可以延迟加载的块
      * 默认情况下，non-initial chunk没有名称，用唯一ID来代替名称。动态岛入时，可以通过魔术注释来显式指定chunk名称

### API

#### 简介
* CLI: 命令行界面
* 模块：webpack在处理模块时，需要理解模块语法
* Node： node接口可以更细粒度的控制，包括：传递多个配置、以程序的方式运行、查阅并收集统计信息
* loaders：对模块的源代码进行转换，将编写成一类将源代码作为参数传入，并将编译转换后的新版本代码传出的函数体
* 插件：在不同时期运行的生命周期挂钩上注册回调函数。在单个编译周期，当每个钩子被执行后，插件拥有当前编译流程的完整访问权限。

#### 命令行接口（CLI）
* webpack.config.js的映射
* webpack-cli 提供的命令
  * build 运行
  * configtest 【config-path】 校验配置
  * server 运行webpack-dev-server
  * watch 运行webpack监听文件变化
  * loader 生成loader仓库
  * plugin 生成plugin仓库
  * 其他： version help info
* init 初始化一个webpack项目
  * npx webpack init [generation-path] [options]
* webpack命令的flags
  * --entry 入口文件
  * --config 配置文件的路径
  * --config-name
  * --name 配置名称，在加载多个配置时使用
  * --merge 合并配置文件
  * --env 传递给配置的环境变量
  * --progress 在构建过程中打印编译进度
  * --output-path 生成文件的输出位置
  * --target node/web
  * --watch 监听文件改变
  * --watch-options-stdin stdin stream结束时，停止监听
  * --hot 启用HMR
  * --dev-tool 是否生成source map，如何生成
  * --prefetch 预先发起请求
  * --json 将结果打印成JSON格式或存储在文件中
  * --mode production/development
  * --stats 如何处理stats
  * --analyze 调用webpack-bundle-analyzer插件来获取bundle信息
* 命令行接口的参数优先级高于配置文件中的参数
* 将cli参数传递给node NODE_OPTIONS
```
NODE-OPTIONS="--max-old-space-size=4096 -r /path/to/prelaod/file.js" webpack
```
* 退出代码
  * 0 成功
  * 1 webpack error
  * 2 配置/选项问题，或内部错误

#### node接口
* 需要自定义构建或开发流程时使用，webpack只负责编译，所有的报告和错误处理都必须自行实现，stats()配置选项不会在webpack()调用中生效
* webpack(options: {}, callback: (err, stats) => {}) // if (err || stats.hasErrors()) { // 处理错误}
* compiler实例
  * 如果不向webpack()传递第二个参数（回调函数），webpack会返回一个compiler实例，可以手动执行该实例，或添加一个监听器
  * compiler实例提供的方法
    * run(callback)
    * watch(watchOptions, handler)
  * compiler只执行最低限度的功能，它吧加载、打包和写入工作都委托到注册过的插件上
```js
compiler.run((err, stats) => {
  // ...
  compiler.close(closeErr => { 
    // ... 
  })
})
```
```js
const watching = compiler.watch({
  aggregateTimeout: 3000,
  poll: undefined
}, (err, stats) => {
  // ...
})

watching.close(closeErr => {
  // ...
})
```
* stats对象
  * 为pack回调的第二个参数，包含以下信息
    * 错误和警告
    * 计时信息
    * module chunk信息
  * 包含方法
    * hasErrors()
    * hasWarnigns()
    * toJson(options) / toString(options)
* MultiCompiler
  * 可以让webpack同时执行多个配置，参数是多个配置对象构成的数组，webpack会生成多个compiler实例，并在所有compiler执行完成后调用callback方法
  ```js
  webpack([
    { entry: './index1.js', output: { filename: 'bundle1.js' } },
    { entry: './index2.js', output: { filename: 'bundle2.js' } },
  ], (err, stats) => {} )
  ```
* 错误处理
  * 致命的webpack错误
  * 编译错误
  * 编译警告
* 自定义文件系统
  * 默认情况下使用普通文件系统来读写
  * 其他类型（内存、webDAV）需要改变inputFileSystem\outputFileSystem
#### stats Data
* webpack编译时，用户可以生成一个包含模块统计信息的JSON文件，用来分析应用中的依赖关系图，从而优化webpack的编译速度 `npx webpack --profile --json=compilation-stats.json`
* 配置结构
```json
{
  version: // webpack版本
  hash: // 编译的特定hash
  time: // 编译时间
  publicPath: 'auto' //
  outputPath: // 输出路径
  assertsByChunkName: {
    main: [],
    named-chunk: [],
    other-chunk: [],
  },
  assets: [],
  chunks: [],
  modules: [],
  entryPoints: {},
  errors: [],
  errorsCount: 0,
  warnings: [],
  warningsCount: 0
}
```
* Asset对象： 编译过程中生成的output文件
  * asset结构
* chunk对象
  * chunk结构
* module对象：编译后的应用程序的实际模块
* entry对象
* 错误和告警信息

#### Hot Module Replacement
* 模块API
  * accept：订阅给定依赖模块（单个或多个）的更新，触发给定的回调函数
  ```js
  module.hot.accept(dep, callback, errorHandler)
  // 更新自身
  module.hot.accept(errorHandler)
  ```
  * decline: 拒绝给定依赖模块的更新，强制更新失败
  ```js
  module.hot.decline(dep)
  // 拒绝更新自身
  module.hot.decline()
  ```
  * despose/addDisposeHandler: 添加一个处理函数，在当前模块代码被替换时执行
  ```js
  module.hot.dispose(data => {})
  ```
  * invalidate：将当前模块无效掉
  * removeDisposeHandler
* API管理
  * status: 获取当前模块热替换进程的状态`module.hot.status()`
    * 状态
      * idle 等待调用check
      * check 检查以更新
      * prepare 准备更新
      * ready 此更新已准备并可用
      * dispose 正在调用被替换模块的dispose处理函数
      * apply 正在调用accept处理函数
      * abort 更新已终止，系统仍处于上一个状态
      * fail 更新抛出异常
* loader interface
  *   
    


#### 疑问梳理自答
* chunk VS module VS bundle
  * 一个文件就是一个module
  * chunk是许多个module的集合。从入口文件出发，webpack通过模块间的引用关系，将这些引用的模块打包成一个chunk。多个入口文件会有多个chunk。
  * chunk是过程中的代码块，bundle是结果的代码块。例如，将devtool配置为'source-map'时，即使只有一个入口文件也不配置代码分割，会产生一个chunk两个bundle
* 产生chunk的三种途径
  * entry入口
  * 异步加载模块
  * 代码分割


[原文链接](https://webpack.docschina.org)

2021.07.25