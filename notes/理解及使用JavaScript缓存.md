#### 为什么要使用缓存
1. 昂贵的函数调用：占用内存，花费时间
2. 缓存调用的返回结果，当下一次输入相同值时，快速取出结果

#### 什么是缓存
1. 缓存是一种优化技术，通过存储开销大的函数执行的结果，并在相同的输入再次出现时返回已缓存的结果，从而加快应用程序的速度

#### 缓存是怎么工作的
1. 闭包&高阶函数

#### 一个例子
斐波那契数列
```
function fibonacci(n) {
  if (n <= 1) {
    return 1
  }
  return fibonacci(n - 1) + fibonacci(n - 2)
}
```
```
// 使用缓存改进
function fibonacci(n, memo) {
  memo = memo || {}
  if (memo[n]) {
    return memo[n]
  }
  if (n <= 1) {
    return 1
  }

  return memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
}
```

#### 使用函数的方式
```
function memoizer(fun) {
  let cache = {}
  return function (n) {
    if (cache[n] != undefined) {
      return cache[n]
    } else {
      let result = fun(n)
      cache[n] = result
      return result
    }
  }
}

// 使用
const fibonacciMemoFunction = memoizer(fibonacciRecursive)
```

#### 何时使用缓存
* 对于昂贵的函数调用，执行复杂计算的函数。
* 对于具有有限且高度重复输入范围的函数。
* 用于具有重复输入值的递归函数。
* 对于纯函数，即每次使用特定输入调用时返回相同输出的函数。

#### 缓存库
* Lodash
* Memoizer
* Fastmemoize
* Moize
* Reselect for Redux

[原文链接](https://github.com/qq449245884/xiaozhi/issues/29)

2019.11.14