#### JS中的基本类型
* String
* Number
* Boolean
* Null
* Undefined
* Object
* Symbol (ES6)

```
'hello' + []  //'hello'=> 'hellp'
'hello' + [89, 100] //'hello89,100'
// hello + Array.toString();
```

#### 数字变成字符串
显式转换
```
var greet = "Hello";
var year = 89;

var yearString = year.toString()
// var yearString = String(year)
```

隐式转换
```
greet + yearString;
```
```
'hello' + 89 // 'hello89'
'hello' + { name: "Jacopo" } // 'hello[object Object]'
```

乘除加减
```
89 ** "alex" //NaN
// ** 指数运算符（es6）
var obj = { name: "Jacopo" } % 508897 //NaN
typeof 9 / "alex" //NaN
```
```
var strange = 9 / "alex"
typeof strange //Number
// 当 NaN 被分配给一个变量时，它就变成了number; ES6 isNaN()
```

#### JS弱比较 == 隐形转换
```
"hello" == "hello" //true
"1" == 1 //true
// 如果第一个操作数是字符串，第二个操作数是数字，那么将第一个操作数转换为数字
```

#### 基本数据类型与对象
基本类型、内置对象（函数直接调用或通过构造函数使用new调用）: String、Number、Boolean、Null、Undefined、Object 和Symbol
1. String
```
var someValue = 555;
String(someValue); //"555"
```
```
var someValue = 555;
var newString = new String(someValue); //555
```

2. Number
```
var someValue = "555";
new Number(someValue); //Number {555}
```
3. Boolean
```
var convertMe = 'alex';
Boolean(convertMe) //true
```
```
var convertMe = 'alex';
typeof new Boolean(convertMe) //"object"
// 用构造函数的方式会返回一个对象
```
4. Object
```
Object('hello'); // String {"hello"}
Object(1); // Number{1}
```
```
Object() // {}
// 没有参数会返回一个空对象
```

首选通过字面量创建对象，通过构造函数创建对象，会带来性能损耗，每次都会创建一个新对象
```
// better
var bool = true
var str = 'hi';
var num = 33;
var obj = { name: "Alex", age: 33 };
```

#### 思考
1. 44 - "alex" 的输出结果是？
2. 44 + "alex" 的输出结果是？为啥？
3. "alex" + { name: "Alex" } 的输出结果是 ？
4. ["alex"] == "alex" 输出结果是啥？为什么呢？
5. undefined == null 输出结果是啥？为什么呢？


[原文链接](https://github.com/qq449245884/xiaozhi/issues/128)

2019.10.31