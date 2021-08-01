### webpack4.0原理到实战

#### bunlde文件结构
* 自执行function
   * webpack生成的代码
      * 主要功能为函数__webpack_require__
      * 根据moduleId在installedModules对象中查找当前模块是否已加载，避免二次加载

#### npm管理器
* what
  * 便于开发者获取和分发代码的工具
  * 使用成熟的包可以重复造轮子
* npm init / npm init -y
* package.json结构
  * main: 执行入口文件
  * scripts: 自定义脚本命令功能
* npm仓库
  * 淘宝镜像仓库 `npm config set registry https://registry.npm.taobao.org`
  * 语义化版本号 1(大版本).0(中版本).1(小版本)
    * ^，大版本固定但是中版本和小版本的最新版本
    * ~，大版本和中版本固定但小版本的最新版本
    * 无前缀，固定这个版本
  * scripts
    * 对包的开发者可以使用的钩子命令（npm包的生命周期）
      * preinstall, postinstall, prepublish, postpublish
    * 对包的使用者可以使用的命令
      * 例如: `dev: 'webpack-dev-server'`, `build: 'eslint ./src && webpack'`
  * npm install的过程
    1. 寻找版本信息文件（package.json）, 依照这个文件给出的信息进行安装
    2. 查package.json的依赖，并检查项目中其他版本信息文件
    3. 如果发现了新包，就更新版本信息文件

#### webpack特性
  * webpack-dev-server 打包生成的js文件存在内存空间，不会占用dist目录
  * loaders
    * webpack-dev-server
    * style-loader, css-loader
  * plugins
    * uglifyjs-webpack-plugin

#### babel
* @babel/core, @babel/cli, @babel/preset-env、@babel/preset-react(转换规则)
* 使用方式：
  * 命令行`babel index.js --presets=@babel/preset-env`
  * package.json配置： `{ babel: { presets: ["@babel/preset-env"] } }`
  * 独立的.babelrc文件（相比package.json，优先级更高）`{ presets: ["@babel/preset-env"] }`
* webpack babel-loader配置
```js
{
  // ...
  use: {
    loader: 'babel-loader',
    options: {
      babelrc: false,
      presets: [
        require.resolve('@babell/preset-react'),
        [require.resolve('@babel/preset-env', { modules: false })] // 因为webpack能处理es的import语法，所以这里设置modules为false，babel不处理，交给webpack处理
      ],
      cacheDirectory: true, // 启用缓存
    }
  }
}
```

#### webpack配置
* html-webpack-plugin 生成index.html
```js
plugins: [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname+'src/index.html'),
    fileName: 'index.html'
  })
]
```
* import时省略后缀
```js
resolve: {
  extensions: ['.js', '.jsx', '.json']
}
```
* HMR热更新实现
  * webpack配置
  ```js
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true
  }
  ```
  * 程序员需要项目代码中实现module.hot方法
  ```jsx
  if (module.hot) {
    module.hot.accept(error => {
      if (!err) {
        // ...
      }
    })
  }
  ```

#### webpack性能优化
* 三个方面进行优化
  * 打包结果优化
  * 构建过程优化
  * Tree-Shaking
* 代码压缩
  * 命令行指定mode=production自动会压缩代码
  * terser-webpack-plugin配置
    ```js
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true, // 加快构建速度
          terserOptions: {
            compress: {
              unsed: true,
              drop_debugger: true,
              drop_console: true,
            }
          }
        })
      ]
    }
    ```
    * terser VS uglify-js
      * uglify-js在es5上做得好而terser在es6上的压缩做的更优秀
* webpack-bundle-analyzer: 打包性能分析
  * 分析打包完成后各个模块的大小等，以图形化的方式展示分析结果
  * webpack配置
  ```js
  development
  document
  ```
* 构建优化
  * loader noParse不解析的文件
    ```js
    modules: {
      noParse: /node_modules\/(jquery\.js)/,
    }
    ```
  * loader exclude/include 不检索/只检索文件（exclude优先级最高）
    ```js
    exclude: /node_modules/
    ```
  * happyPack / thread-loader: webpack任务在node中是单线程的，happyPack会把任务分解为多个子进程并发执行，需要loader支持happyPack
    ```js
    const HappyPack = require('happypack')
    const happyPackThreadPool = HappyPack.ThreadPool({ size: })

    plugins: [
      new HappyPack({
        id: 'jsx',
        threads: happyPackThreadPool,
        loaders: ['babel-loader']
      })
    ]
    ```
  * 预编译
  * 缓存
  * 选择更快的loader
    * fast-sass-loader
* tree-shaking 消除无用的js代码（DCE）
  * webpack分析modules的引用情况，去除没有引用的modules
  * 在mode=production生效
  * webpack性能核心
* 总结：webpack是什么
  * 前端发展产物
  * 模块化打包方案
  * 工程化方案

[原文链接](https://www.bilibili.com/video/BV1a741197Hn)

2021.07.30
