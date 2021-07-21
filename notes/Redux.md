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

#### 高级

##### 异步Action
* Redux-thunk
  * applyMiddleware
    ```js
    const store = createStore(reducer, preloadedState, applyMiddleware(thunkMiddleware))
    ```

##### 异步数据流
* Redux-thunk
* Redux-promise
* middleware链的最后一个middleware必须dispatch一个action

##### Middleware
* 指可以被嵌入在框架接收请求到产生响应过程之中的代码
* 特性是可以被链式组合
* 提供的是位于 action 被发起之后，到达 reducer 之前的扩展点

##### 搭配React Router
* connect(mapStateToProps)(<MyComponent />)

#### 技巧

##### 使用扩展运算符

##### 减少样板代码
* Action Createor，一个函数，返回一个action对象
  * 某种情况下具有优势，提前判断、逻辑共享

##### 组织Reducer
* Reducer基础概念
* Reducer基础结构
* Reducer逻辑拆分
* combineReducer用法
* state范式化
  * 按类型分
  * id作为key
  ```js
  // 原始结构
  posts = [{
    id,
    author: { userId, userName },
    body,
    comments: [{ id, author: { userName, userId }, comment }];
  }]

  // 范式化后
  {
    posts: {
      byId: {
        '1': { id, author: '1', comment: ['1'], body },
      },
      allId: ['1', '2']
    },
    user: {
      byId: {
        '1': { userId, userName }
      },
      allId: ['1', '2']
    },
    comments: {
      byId: {
        '1': { id, author, comment }
      },
      allId: ['1']
    }
  }
  ```

#### 常见问题
* props.dispatch: connect有两个参数mapStateToProps, mapDispatchToProps, 如果没有传入mapDispatchToProps，redux将默认把dispatch注入组件props，如果传了mapDispatchToProps，就不会自动注入

#### 词汇表
* reducer
  * reducer概念不是redux创造的，在JS中有Array.prototype.reduce
  * 意思是累进计算，由上次的累积的结果state与当前累积的action计算得到下一个结果state

#### Api
* bindActionCreators(actionCreators, dispatch)
  * 返回actionDispatchers, 返回的对象函数可以直接调用不需要通过dispatch
  ```js
  function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) }
  }

  export default connect(null, mapDispatchToProps)(App)
  ```
* compose
  * 从左到右组合多个函数
  * compose(funcA, funcB, funcC) -> compose(funcA(funcB(funcC())))
  ```js
  store = createStore(reducer, compose(
    applyMiddleware(thunk),
    DevTools.instrument()
  ));
  ```

#### React-redux
##### API
* connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
  * mergeProps(stateProps, dispatchProps, ownProps): props
  * options: { isPure: true(shouldComponentUpdate进行浅比较), withRef: false }
  * 常见问题
    * export default connect(state => state)(TodoApp)
      * 注入 dispatch 和全局 state，这样会导致每次 action 都触发整个 TodoApp 重新渲染。
      * 正确做法：每个组件只监听它所关联的部分 state

#### compose源码实现
```js
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```
[redux源码仓库](https://github.com/reduxjs/redux/tree/v3.7.2)

#### 其他扩展
* 扩展运算符 {...obj1, ...obj2} vs Object.assign(obj1, obj2);
  * newObj = {...obj1} / newObj = Object.assign({}, obj1)效果一样的，但如果Object.assign的第一个参数不是空对象，那么第二个参数将会修改第一个参数
  * 扩展运算符更简洁性能好，推荐使用
* [1, 2].slice() // 复制一个数组

#### 疑问梳理
* 为什么state要可序列化（即JSON.stringify(state)）
  * symbol不可被序列化

[原文链接](https://www.redux.org.cn/)

2021.07.20