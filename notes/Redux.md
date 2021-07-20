### Redux

#### Redux是什么？
* JavaScript状态容器，提供可预测化的状态管理
* 可以在不同的环境构建一致化的应用，客户端、服务端、原生应用
* 方便测试
* 体积小
* 可以与非react的其他库搭配使用

#### 介绍

##### 动机
1. 单页应用日趋庞大，JavaScript要管理非常多的state，不同模块的state相互影响，很难回溯问题和扩展功能
2. 变化和异步应该分开，而不是混淆在一起

##### 核心概念
* modal
* action
* reducer

##### 三大原则
* 单一数据源
  * 整个应用的state都存在唯一的store中
* state是只读的
  * 唯一可以改变state的方法是触发一个action
* 使用纯函数来执行修改
  * 编写reducer，接受两个参数：之前的state和action，返回最新的state

##### 先进技术
* Flux
  * 相同点
    * 都把数据更新集中到特定的一个层（flux：store，Redux：reducer）
    * 都不允许直接修改state
    * 都通过action来对要进行的修改来描述
  * 不同点
    * Redux没有dispatcher的概念，只是使用纯函数进行更新
    * Redux设想你永远不会变动你的数据
    * reducer可以是不纯的，但不推荐
  * Elm
    * 函数式编程语言，是一门语言
    * 在执行纯度，静态类型，不可变动性，action 和模式匹配等方面更具优势
  * Immutable
    * 可实现持久数据结构的JavaScript库
    * 一旦创建就不能更改，对Immutable对象的操作会返回一个新的Immutable对象
  * Baobab
    * 实现了数据不可变特性的 API，用以更新纯 JavaScript 对象
    * 与Redux相斥，使用不同的方法，解决同一个问题
  * Rx(Reactive Extensions)
    * 管理复杂异步应用
    * 可以与Redux搭配使用


#### 基础

##### Action
* Action是修改store的唯一来源
* 一般使用store.dispatch(action)

##### Reducer
* 响应action并把更新发送到store
* (previousState, action) => state
* 纯函数，不能在函数内部直接修改state，默认情况下返回previousState
* 拆分合并reducer：combineReducers

##### Store
* API
  * store = createStore(reducers);
  * store.getState()
  * store.dispatch(action)
  * store.subscribe(listener)

##### 数据流
* 严格的单向数据流
* 生命周期
  1. 调用dispatch(action)
  2. Redux store调用传入的reducer
  3. 根reducer把多个子reducer输出合并为单一state树
  4. Redux store保存了根reducer返回的完整state树

##### 搭配React
* 使用Provider功能以便每一个组件都能访问store

[原文链接](https://www.redux.org.cn/)

2021.07.20