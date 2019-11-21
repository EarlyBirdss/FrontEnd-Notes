#### JS原始数据类型的变量和声明
```
let myNumber = 23

1. 为变量(myNumber)创建唯一标识符(identifier)。
2. 在内存中分配一个地址(在运行时分配)。
3. 将值 23 存储在分配的地址。

myNumber 等于保存值 23 的内存地址
```
```
let newVar = myNumber

newVar与myNumber指向同一个内存地址
```
```
myNumber = myNumber + 1 // myNumber: 24, newVar: ?
JS中的原始数据类型是不可变的，当 myNumber + 1 解析为24时，JS 将在内存中分配一个新地址，将24作为其值存储，myNumber将指向新地址
```

#### JS内存模式：调用堆栈和堆
1. 调用堆栈是存放原始数据类型的地方(除了函数调用之外)。
2. 堆是存储引用类型的地方。跟调用堆栈主要的区别在于，堆可以存储无序的数据，这些数据可以动态地增长，非常适合数组和对象。

#### JS 引用类型的变量声明和赋值
```
let myArray = []

1. 为变量创建唯一标识符（“myArray”）
2. 在调用栈内存中分配一个地址（将在运行时分配）
3. 把2中的地址存储上堆上分配的内存地址的值（将在运行时分配）<地址， 地址>
4. 堆上的内存地址存储分配的值（空数组[]）
```

#### let & const
1. let 允许你更改内存地址；const 不允许你更改内存地址。
```
const notAllowedModifyNum = 1;

1. 分配了一个内存地址
2. 当执行更改语句如：notAllowedModifyNum = 2时，notAllowedModifyNum是一个原始数据类型，所以试图分配一个新的内存地址，但这是不允许的，因此返回错误信息。
```
```
const notAllowedModifyArr = [];

1. 因为数组存在调用栈上的只是一个内存地址，但实际内容是存放在堆上，所以只能控制数组不会被重新赋值，而无法控制数组内部的元素，如push操作
```

[原文连接](https://github.com/qq449245884/xiaozhi/issues/46)

2019.11.21