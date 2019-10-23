#### 函数
1. 一处封装，四处使用

#### 函数定义
1. 函数声明方式     function(){}  局部变量 js运行时加入作用域
2. 函数表达式       const fn = () => {} 局部变量 js运行时加入作用域
3. 使用构造函数方式  const fn = new Function(arg1, arg2, arg3, ...., argn, fn) 全局变量 效率低 js编译时加入作用域
  
#### 函数的参数
1. 形参&实参： 形参在非严格模式下，可以同名，同名的形参只去最后一个

#### 函数的调用方式
1. 函数调用
2. 方法调用
3. 通过构造函数调用
4. 间接调用

###### 构造函数调用
参数：一般情况下，构造器参数与函数调用一致，但如果构造器不接受参数，可以省略圆括号，以下两种写法是等价的
```
var obj1 = new Object();
var obj2 = new Object;
```

例子
```
function Book(bookName){
  this.bookName = bookName;
}
var bookName = 'JS 深入浅出';
var book = new Book('ES6 深入浅出');
console.log(bookName);// JS 深入浅出
console.log(book.bookName);// ES6 深入浅出
Book('新版JS 深入浅出');   //{没有new, this在非严格模式下为window, 严格模式undefined}
console.log(bookName); // 新版JS 深入浅出
console.log(book.bookName);// ES6 深入浅出
```

##### 间接调用
1. apply, call 

#### 词法（静态）作用域&动态作用域
1. 一般来说，一段代码中所用到的名字并不总是有效、可用的，而限定这个名字的可用性代码范围就是这个名字的作用域。
2. 词法作用域：在词法分析就确定了，不会改变。
3. 动态作用域是在函数被调用的时候才确定的

#### 调用栈
1. 执行上下文： 当前js代码被解析和执行时所在环境的抽象概念
2. 主要有两类
   1. 全局执行上下文：一个程序只存在一个全局执行上下文。1. 创建全局对象，window；2. 将this指向window  
   2. 函数执行上下文：在函数被调用时，创建。
3. 栈：先进先出

```
var myOtherVar = 10;

function a() {
  console.log('myVar', myVar);
  b();
}

function b() {
  console.log('myOtherVar', myOtherVar);
  c();
}

function c() {
  console.log('Hello world!');
}

a();

var myVar = 5;

// "myVar" undefined
// "myOtherVar" 10
// "Hello world!"
```

[原文地址](https://github.com/qq449245884/xiaozhi/issues/123)

2019.10.23