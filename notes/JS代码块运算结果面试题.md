##### 偶然创建的全局变量
```
function foo() {
  let a = b = 0;
  a++;
  retuan a;
}

foo();
typeof a; //
typeof b; //
```
答案： a // undefined; b // number
解析：
1. let a = b = 0; 该语句声明了局部变量a，同时声明了一个全局变量b；相当于window.b = 0; let a = b;
2. let a 仅在foo函数作用域中可访问，在外部作用域不可访问，故typeof a 为undefined
##### 数组的length属性
``` 
const clothes = ['jecket', 't-shirt'];
clothes.length = 0;

clothes[0]; //
```
答案：undefined
解析：clothes.length = 0; 相当于清空数组操作，故此时clothes[0]为undefined
##### 考验眼力对的魔幻题
```
const lenth = 4;
const number = [];
for (var i = 0; i < length; i++); {
  number.push(i + 1);
}

numbers; //
```
答案：[5]
解析：注意for后面加了一个分，js会认为该语句已结束，所以for循环执行了4次空语句，当退出循环的时候，此时i的值为4；再执行{ number.push(i+1) }，最终number只push进去了一个数字5
##### 自动分号插入
```
function arrayFromValue(items) {
  return 
    [items];
}
```
答案：undefined
解析：注意这里的return和[items]之间已经换行，js会在换行之间自动插入分号，所以return语句变成了：return; [items];
##### 经典闭包问题
```
let i;
for (i = 0; i < 3; i++)  {
  const log = () => {
    console.log(i);
  }
  setTimeout(log, 100);
}
```
答案：3,3,3
解析1：1. for迭代3次，每次迭代钱都会创建一个新函数log，该函数将捕获变量i。然后，setTimeout调度log的执行。2. 当for循环完成时，i的值为3。3.setTimeout调用3个log回调，log读取到i的当前值为3.
解析2：JS的时间循环机制：for为同步代码，setTimeout为异步代码宏任务，浏览器先执行同步代码再执行setTimeout的回调，当执行回调时，for循环早就执行完了当前i的值为3。
##### 浮点运算
```
0.1 + 0.2 == 0.3 //
```
答案：false
解析：二进制编码误差
##### 变量提升
```
myVar; //
myConst; //

var myVar = 'value';
const myConst = 2;
```
答案: myVar; // undefined; myConst; // 触发ReferenceError;
解析：用var声明的变量存在变量提升，但是在声明之前访问时myVar，ES6中let,const有暂时性死区，在声明之前访问会触发错误

[原文链接](https://juejin.im/post/5dacf37ef265da5b926bdc9a#heading-0)

2019.10.21