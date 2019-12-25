### JS引擎

#### JS引擎和全局内存
```
var num = 2;
function pow(num) {
  var fixed = 89;
  return num * num;
}
pow(num);
```
1. 第一步JS引擎（而非浏览器）执行js代码，将num, pow 存入全局变量
2. 当函数被调用时，函数被推入调用栈，并创建函数执行上下文（一个函数一个执行上下文，如有函数内部有嵌套函数，该嵌套函数也有一个执行上下文）,分配给该函数全局执行上下文。
3. 总结
   1. 将变量和函数的声明放入全局内存(堆)中
   2. 将函数的调用放入调用堆栈
   3. 创建全局执行上下文，在其中执行全局函数
   4. 创建多个本地执行上下文(如果有内部变量或嵌套函数)


#### JS引擎与异步处理
1. 调用堆栈一次可以执行一个函数，甚至一个阻塞函数也可以直接冻结浏览器
2. 当我们运行一个异步函数时，浏览器接受该函数并运行它

```
var num = 2;
function pow(num) {
    return num * num;
}
pow(num);
setTimeout(callback, 10000);
function callback(){
  console.log('hello timer!');
}
```
3. setTimeout由浏览器执行，执行完成后将回调传入时间循环的回调队列中，等待函数执行栈为空时，由event loop代入执行栈执行

如下，图1：setTimeout开始执行
![函数执行示意图](https://raw.githubusercontent.com/EarlyBirdss/FrontEnd-Notes/feature-general/images/2019.10.24_1.png)
如下，图2：setTimeout执行完毕
![函数执行示意图进入callback队列](https://raw.githubusercontent.com/EarlyBirdss/FrontEnd-Notes/feature-general/images/2019.10.24_2.png)


#### 解惑
1. JS引擎和浏览器
   1. JS引擎执行JS代码，setTimeout并非js内置函数由浏览器执行
   2. JS引擎只有一个调用栈执行函数，故JS引擎是单线程的，而不是指浏览器是单线程的

[原文地址](https://github.com/qq449245884/xiaozhi/issues/124)

2019.10.24