### React17源码训练营

#### 虚拟DOM
* what: 用JavaScript对象表示和描述DOM结构和信息，当状态变更时，更新JavaScript的对象结构，这个JavaScript被称为虚拟dom
* why：dom操作很慢，轻微的操作都可能导致页面重新排版，非常耗性能，js对象操作起来更快更简单。通过diff算法对比新旧vdom之间的差异，可以批量的、最小化的执行dom操作，从而提高性能。
* where：JSX语法。如果状态变化，VDOM将相应作出改变，再通过diff算法对比出新旧vdom区别，从而作为最终dom操作

#### JSX
* 语法糖，像XML的JavaScript语法扩展
* 为什么需要jsx
  * 开发效率：使用jsx语法编写更简单更快
  * 执行效率：jsx编译JavaScript后进行了优化，执行更快
  * 类型安全：在编译时就能发现错误
* React16原理：babel-loader会预编译React.createElement
* React17原理：不会将jsx转换为React.createElement，而是从React的package中引入新的入口函数并调用。

#### 为什么要使用fiber链表
* 在fiber出现之前，由于JavaScript执行是单线程的，如果react需要处理大量数据，可能会阻塞浏览器的渲染操作，造成页面卡顿，用户响应不及时。fiber加入了优先级的机制，一个协调任务会被打断，可能会执行多次，这些任务只会在浏览器空闲时间内执行，如果有优先级更高的任务，比如用户操作，会优先执行这些任务。这也是componentWillMount等生命周期函数不再推荐使用的原因（执行多次）。

#### fiber链表
指针
* child
* sibling
* return

#### requestIdleCallback
* react内容实现了一个类似于requestIdleCallback的方法。
* windows.requestIdleCallback在浏览器上有兼容问题；FPS为20，不够流畅。正常FPS应为60（每秒刷新60下）


#### Hook

[原文链接](https://www.bilibili.com/video/BV1UX4y1V78x)

2021.07.12