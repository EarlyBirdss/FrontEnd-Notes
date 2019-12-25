接上篇
### 引擎异步处理

#### 异步JS，回调函数和事件循环
1. 浏览器接受异步函数，并处理它，处理完成后通过放入callback queu中，等待event loop处理，等JS调用栈空闲时，再放入JS引擎的调用栈中执行回调

#### 回调地狱和ES6中的promises
1. JavaScript 中的回调地狱指的是一种编程风格，其中回调嵌套在回调函数中，而回调函数又嵌套在其他回调函数中
2. JS的 Promise是未来事件的表示，未来事件处理成功调用resolve回调，处理发生错误调用reject回调

#### promise的错误处理
```
const myPromise = new Promise(function(resolve, reject) {
  reject('Errored, sorry!');
});
myPromise.catch(err => console.log(err));
```

```
Promise.reject({msg: 'Rejected!'}).catch(err => console.log(err));
```

#### async/await
1. async/await是promise的语法糖（generator）
2. 以同步的方式编写代码，async函数也返回一个promise
3. 可以直接使用try catch进行错误处理
```
async function getData() {
  const data = await myPromise;
  return data;
}
getData().then(data => console.log(data));
```

#### 总结
1. JS 是一种用于Web的脚本语言，具有先编译然后由引擎解释的特性。 在最流行的JS引擎中，有谷歌Chrome和Node.js使用的V8，有Firefox构建的SpiderMonkey，以及Safari使用的JavaScriptCore。

2. JS引擎包含很有组件:调用堆栈、全局内存(堆)、事件循环、回调队列。所有这些组件一起工作，完美地进行了调优，以处理JS中的同步和异步代码。

3. JS引擎是单线程的，这意味着运行函数只有一个调用堆栈。这一限制是JS异步本质的基础:所有需要时间的操作都必须由外部实体(例如浏览器)或回调函数负责。

4. 为了简化异步代码流，ECMAScript 2015 给我们带来了Promise。Promise是一个异步对象，用于表示任何异步操作的失败或成功。但改进并没有止步于此。在2017年，async/await诞生了：它是Promise的一种风格弥补，使得编写异步代码成为可能，就好像它是同步的一样。

#### 思考
1. 浏览器如何理解 JS 代码？
2. 调用堆栈的主要任务是什么？
3. 你能描述一下 JS 引擎的主要组件以及它们是如何协同工作的吗？
4. 微任务队列是做什么的 ？
5. Promise 是什么？
6. 是否可以处理异步代码中的错误？ 如果可以，怎么做？
7. 你能说出浏览器API的几个方法吗

[原文地址](https://github.com/qq449245884/xiaozhi/issues/124)

2019.10.25