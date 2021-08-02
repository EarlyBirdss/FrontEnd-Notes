### webpack5性能优化与原理

#### 编译时间优化
* 缩小查找范围 
  * resolve-extensions 指定文件扩展名
  * resolve-alias 指定查找别名
  * resolve-modules 指定查找目录
  * resolve-mainFields 从package.json中的哪个字段查找入口文件
  * resolve-mainFiles 
  * loader-oneOf 只匹配数组的一个
  * external 外部引入不需要打包
  * resolveLoader
* noParse
* IngnorePlugin
* thread-loader
* 利用缓存
  * babel-loader options={cacheDirectory: true}
  * cache-loader
  * hard-source-webpack-plugin webpack5内置了
* 编译体积优化
  * 压缩js,css,js,html,image
    * css: optimize-css-asserts-webpack-plugin
    * js: terser-webpack-plugin
    * image: image-webpack-loader
  * 清除无用css
    * purgecess-webpack-plugin
  * 
// ...

[原文链接](https://www.bilibili.com/video/BV1jy4y1S7fy?from=search&seid=7169479936654631108)

2021.08.01