### Redux-saga

#### 基本概念

#### saga辅助函数
* takeEvery
* takeLatest

##### 声明式Effects
* call
* apply

##### dispatch action
* put

##### 错误处理
* try catch

#### 高级

##### 监听未来的action
* takeEvery('*', callback) 捕获发起的所有类型的action
```js
function* watchAndLog() {
  yield takeEvery('*', function* logger(action) {
    const state = yield select()
    ...
  })
}
```
* take 告诉middleware等待一个特定的action
```js
function* watchAndLog() {
  while(true) {
    const action = yield take(*);
    const state = yield select();
  }

}
```
* take和takeEvery的区别
  * takeEvery只能捕获，只能在action触发时一遍又一遍被调用，无法决定停止监听
  * take则是主动拉取action，可以更好的控制流程，也可以使用同步的方式描述流程
```js
// take方式允许登录和退出登录在同一个逻辑代码块里
function* loginFlow() {
  while (true) {
    yield take('LOGIN')
    ...
    yield take('LOGOUT')
    ...
  }
}
```

##### 无阻塞调用
* fork
  * fork一个任务，任务会在后台启动，流程可以继续而不用等这个任务完成

##### 同时执行多个任务
* yield [call(myFun1), call(myFunc2) ]

##### 多个effect质检启动race
* 第一个完成的
```js
// 触发一个远程的获取请求，并且限制了 1 秒内响应，否则作超时处理
const { post, timeout } = yield race({
    post: call(myFunc1),
    timeout: call(delay, 100)
  });
if (timeout) // ...
```
* race会自动取消失败的effect

##### 使用yield*对saga进行排序
* yield* 是内置的（JS？）

#### 名词解释
* Effect
  * 一个plain object js对象，如果一个call(myFun, arg1, arg2)可以创建一个effect
* Task
  * 后台运行的进程，用fork来创建一个任务
  * 可以同时创建多个task
* 阻塞调用/非阻塞调用
  * 阻塞调用：
    * take, pull, put
    * Saga 在 yield Effect 之后会等待其执行结果返回，结果返回后才会恢复执行 Generator 中的下一个指令
  * 非阻塞调用：
    * fork, cancel, join
    * Saga 会在 yield Effect 之后立即恢复执行
    ```js
    function* saga() {
      yield take(ACTION)              // 阻塞: 将等待 action
      yield call(ApiFn, ...args)      // 阻塞: 将等待 ApiFn (如果 ApiFn 返回一个 Promise 的话)
      yield call(otherSaga, ...args)  // 阻塞: 将等待 otherSaga 结束

      yield put(...)                   // 阻塞: 将同步发起 action (使用 Promise.then)

      const task = yield fork(otherSaga, ...args)  // 非阻塞: 将不会等待 otherSaga
      yield cancel(task)                           // 非阻塞: 将立即恢复执行
      // or
      yield join(task)                             // 阻塞: 将等待 task 结束
    }
    ```
* watcher/worker
  * 使用两种saga来组织控制流的方式？？
  * Watcher: 监听发起的 action 并在每次接收到 action 时 fork 一个 worker
  * Worker: 处理 action 并结束它
  ```js
  function* watcher() {
    while(true) {
      const action = yield take(ACTION)
      yield fork(worker, action.payload)
    }
  }

  function* worker(payload) {
    // ... do some stuff
  }
  ```

[原文链接](https://redux-saga-in-chinese.js.org/index.html)