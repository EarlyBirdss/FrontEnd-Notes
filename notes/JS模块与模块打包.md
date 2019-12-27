#### 模块

#### 什么是模块
1. 好的作者能将他们的书分成章节，优秀的程序员将他们的程序划分为模块。
2. 高内聚低松耦，具有不同的功能，允许在必要时对它们进行替换、删除或添加，而不会扰乱整体功能。

#### 为什么使用模块？
1. 可维护性
2. 命名空间
3. 可重用性

#### 如何创建模块？
1. 匿名闭包
```
(function () {
  // do something
}());
```

2. 全局导入
jQuery等库使用的方式。将全局变量作为参数传入，好处是：预先声明全局变量，让别人更容易阅读你的代码
```
(function (globalVariable) {
  globalVariable.somefn = () => {
    // do something
  };
}(globalVariable));
```

3. 对象接口
```
var myGradesCalculate = (function () {

  const privateVar = 1;

  return {
    publicFn: () => {
      // do something
    }
  };
}());
```

4. 显式模块模式
与对象接口唯一不同的是，变量和方法先声明再返回，确保在返回之前这些方法和变量都是私有的
```
var myGradesCalculate = (function () {

  const privateVar = 1;
  const publicFn: () => {
    // do something
  };

  return {
    publicFn
  };
}());
```

5. 总结
以上方法都有一个共同点，使用单个全局变量将其代码包装在函数中，从而使用闭包作用域为自己创建一个私有名称空间。缺点是，需要注意加载文件的正确依赖顺序，管理依赖关系。

#### CMD
好处：
1. 避免全局命名空间污染
2. 依赖关系更加明确
缺点：
1. 只能同步加载，只要加载模块的脚本正在执行，就会阻止浏览器运行其他内容
```
// 定义
function myModule() {
  this.hello = function() {
    return 'hello!';
  }

  this.goodbye = function() {
    return 'goodbye!';
  }
}

module.exports = myModule;

// 使用
var myModule = require('myModule');

var myModuleInstance = new myModule();
myModuleInstance.hello(); // 'hello!'
myModuleInstance.goodbye(); // 'goodbye!'
```

#### AMD
好处：异步加载；模块可以是对象，函数，构造函数，字符串，JSON 和许多其他类型，而CommonJS 只支持对象作为模块。
缺点：AMD不兼容io、文件系统或者其他服务器端的功能特性，而且函数包装语法与简单的require语句相比有点冗长
```
// 定义
define([], function() {

  return {
    hello: function() {
      console.log('hello');
    },
    goodbye: function() {
      console.log('goodbye');
    }
  };
});

// 加载使用
define(['myModule', 'myOtherModule'], function(myModule, myOtherModule) {
  console.log(myModule.hello());
});
```

#### UMD
综合AMD和commonJS
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD
    define(['myModule', 'myOtherModule'], factory);
  } else if (typeof exports === 'object') {
      // CommonJS
    module.exports = factory(require('myModule'), require('myOtherModule'));
  } else {
    // Browser globals (Note: root is window)
    root.returnExports = factory(root.myModule, root.myOtherModule);
  }
}(this, function (myModule, myOtherModule) {
  // Methods
  function notHelloOrGoodbye(){}; // A private method
  function hello(){}; // A public method because it's returned (see below)
  function goodbye(){}; // A public method because it's returned (see below)

  // Exposed public methods
  return {
      hello: hello,
      goodbye: goodbye
  }
}));

#### ES6
```
var counter = 1;

function increment() {
  counter++;
}

function decrement() {
  counter--;
}

module.exports = {
  counter: counter,
  increment: increment,
  decrement: decrement
};
```

### 模块打包

#### 什么是模块打包
模块打包只是将一组模块（及其依赖项）以正确的顺序拼接到一个文件（或一组文件）中的过程。

#### 为什么要打包
1. 如果不打包： 所有的文件都通过script标签引入到页面，浏览器将逐个去加载他们，相当耗时
2. 将所有文件（或部分文件）打包或“拼接”到一个大文件，减少请求数

#### 有哪些打包的方法
1. Browserify： 浏览器版本的commonJS
```
// 在这种情况下，我们有一个依赖项（myDependency），使用下面的命令，Browserify 以 main.js 为入口把所有依赖的模块递归打包成一个文件：
browserify main.js -o bundle.js

// Browserify 通过跳入文件分析每一个依赖的 抽象语法树(AST)，以便遍历项目的整个依赖关系图。一旦确定了依赖项的结构，就把它们按正确的顺序打包到一个文件中。然后，在 html 里插入一个用于引入 “bundle.js” 的 <script> 标签，从而确保你的源代码在一个 HTTP 请求中完成下载。
```

2. 打包 AMD
* RequireJS或Curl
* AMD 和 CommonJS 在打包方面的区别在于，在开发期间，AMD 可以省去任何构建过程

3. Webpack

4. ES6 模块
* ES6 模块的设计考虑到了静态分析。
* ECMAScript 目前有一个解决方案的规范，称为 ECMAScript 6 module loader API。简而言之，这是一个纲领性的、基于 Promise 的 API，它支持动态加载模块并缓存它们，以便后续导入不会重新加载模块的新版本。

#### 有了原生的 ES6 模块后，还需要模块打包吗？
* HTTP/2 会让模块打包过时吗？
  * HTTP/2 是完全多路复用的，这意味着多个请求和响应可以并行发生。
  * 大多数网站都用上 HTTP/2 的那个时候离我们现在还很远。


[原文地址](https://github.com/qq449245884/xiaozhi/issues/20)

2019.12.27
