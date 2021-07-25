### dva

#### 首页
* 简单易学：只有6个api
* elm模式：通过reducer, effects, subscriptions组织models。简化redux和redux-saga引入的概念
* 插件机制：比如dva-loading


#### 介绍
* dva是基于redux和redux-saga的数据流方案，为了简化开发，dva也内置了react-router和fetch，可以理解为一个轻量级的应用框架

特性：
* 易学易用
* elm概念
* 插件机制
* 支持HMR

怎么来的？
* redux + redux-saga的项目带来的问题：
  * 概念太多
  * reducer，saga，action都是单独分离的文件，编辑成本高，并且也不方便组织业务模型
  * saga书写太复杂，每监听一个action都需要fork -> watcher -> worker这样的流程
* dva就是去解决这些问题的

#### dva概念
* 数据流向
* models
* state
```js
const app = dva();
app._store //
```
* action
* dispatch
  * dispatch = (a: Action) => Action
* reducer
* effect
* subscription
  * 从源获取数据的方法，来自于elm
  * 订阅一个数据源，dispatch一个action
  * 数据源可以是：当前的时间、websocket连接、keyboard输入、geolocation变化、history路由变化
* Router
```js
app.router(({ history }) => 
  <Router history={history}>
    <Route Path="/" component={HomePage}>
  </Router>
})
```
* Router Component
  * 以页面为维度设计Container Components

#### 入门课
* dva = React-Router + Redux + Redux-saga
dva 应用最简结构
```js
const app = dva();
app.model({
  namespace: 'count',
  state: 0,
  reducers: {
    add: state => state + 1
  },
  effects: {
    *addAfterOneSecond(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'add' })
    }
  }
});

app.router(() => <ConnectedApp />);
app.start('#root');
```

##### API
* app = dva(opt)
opts包括
  * history，默认是hashHistory
  * initialState
  * 也可以配置hooks，如下：onError, onAction, onStateChange, onEffect, onHmr, extraReducers, extraEnhances
* app.use(hooks)
  * 配置hooks或者注册插件
  * hooks包含onError, onAction, onStateChange, onEffect, onHmr, extraReducers, extraEnhances
```js
app.use(createLoading(opts));
```
* app.model(model)
* app.unmodel(namespace)
  * 取消model注册
* app.replaceModel(model)
  * 替换model，对于HMR非常有用
* app.router(({ history, app }) => RouterConfig)
  * 注册路由表
* app.start(selector?)
  * 启动应用

[原文链接](https://dvajs.com/)

2021.07.25