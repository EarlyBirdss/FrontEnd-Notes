### 手写一个promise

##### what：什么是promise
* promise接收一个执行器函数(excutor)作为参数, excutor包含两个参数，resolve\reject。
* primise有三个状态，pending、resolved、rejected，并且状态只能由pending转为resolved或rejected状态，并且只能转换一次。
* promise有一个实例方法then，接收两个参数，分别为resolve回调，在pending转为resolved时调用，并传递excutor中resolve传递的value参数；reject回调，在pending转为rejected时调用，并传递excutor中reject传递的reason参数
* 其他常用实例方法
  * all: 接收一个promise(也可以不为promise，all内部将转换为promise)数组，只有全部promise都成功才返回成功调用resolve回调，结果为等序的promise结果数组
  * race: 同all, 接收promise数组，谁先执行完返回谁的结果
* 函数方法
  * Promise.resolve()
  * Promise.reject()

##### why: 为什么使用promise
* 异步解决方案
* 可以链式调用，避免回调地狱的问题
* 可以在异步操作结束后仍可以调用回调（即先保存异步操作的结果resolve(data), promise.then(resolve(data))可以在任意时刻调用）

##### how: 怎么实现一个promise
* [测试地址](../codes/Promise/index.html)
* [代码地址](../codes/Promise/promise.js)

##### async/await
* generator的语法糖
* 在函数前加async返回一个promise对象
* await后接一个表达式
* async函数内部可以不使用await，但使用了await的函数必须加async

##### 其他
* 实现Promise.all()，定义了一个finishedLength变量，使用const修饰，并且执行了finishedLength++操作。调试发现，Promise.all()未生效，.then回调未执行，控制台也没有报错。再细看后，将finishedLength变量的声明改为let后，Promise.all()方法测试通过。
* 在回调中传入一个状态为pending的promise，可以中断promise链

2021.06.29