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
* 局限性
  * saga只允许任务的顺序组合，一次只能yield一个generator
```js
const score1 = yield* playLevelOne();
const score2 = yield* playLevelTwo();
const score3 = yield* playLevelThree();
```

##### 组合sagas
* 直接使用yield并行启动一个或多个任务
```js
const products = yield call(fecthApi, productId)// yield单个任务
const results  = yield [call(task1), call(task2)] // yield多个任务
```

##### 取消任务
* 一旦任务被fork，可以使用yield cancel(task)来终止任务
* 自动取消：
  * race中，除了优胜者，其他effect都会被取消
  * 并行的effect(yield [...])一旦有一个被拒绝，并行的effect将会被拒绝

##### redux-saga的fork model

##### 并发
* takeEvery
  * 可以让多个 saga 任务并行被 fork 执行。
  *  take + fork
* takeLatest
  *  不允许多个 saga 任务并行地执行。一旦接收到新的发起的 action，它就会取消前面所有 fork 过的任务（如果这些任务还在执行的话）
  * take + fork + cancel

##### 链接sagas至外部输入输出
* take是通过等待action被发起到store来解决solved的
* put是发起action
* action是当作参数传递到
* take/put被当作是store的输入输出

##### 使用channel
* channels概括了effects与外部事件源与sagas之间的通信
* channels还可以用于在store中对特定的saga排序
* saga提供了actionChannel方法
```js
// 该例子展示同步处理actions
function* watchRequests() {
  const requestChan = yield actionChannel('REQUEST');
  while(true) {
    const { payload } = yield take(requestChan);
    yield call(handleRequest, payload);
  }
}
```
* eventChannel factory连接外部事件
* eventChannel接受一个subscriber参数，subscriber用来初始化外部事件来源，subscriber提供一个eimitter函数，调用emitter来将事件来源传到channel上
```js
function countdown(secs) {
  return eventChannel(emitter => {
    const iv = setInterval(() => {
      secs -= 1;
      if (secs > 0) {
        emitter(secs);
      } else {
        emitter(END);
      }
    }, 1000);
    // 必须回传一个unSubscriber
    return () => clearInterval(iv);
  })
}

function* saga() {
  const chan = yield call(countdown, value);
  // chan.close()可以关闭channel并取消订阅
  try {
    while(true) {
      let seconds = yield take(chan);
    }
  } finally {
    // 终止
  }
}
```

#### 技巧
* 节流(Throttling)
```js
// 在500ms的时间内，最多只接受一个CHANG_INPUT的action
yield throttling(500, 'CHANG_INPUT‘， handleChange);
```
* 防抖动(debouncing)
```js
// takeLatest， 在执行handleInput前等待500ms
function* handleInput() {
  delay(500);
}

function* watchInput() {
  yield takeLastest('INPUT_CHANGE', handleInput);
}
```
* ajax请求失败重试
```js
function* fetchApi() {
  while(true) {
    try {
      const response = yield call(requestApi);
      return response;
    } catch(error) {
      delay(2000);
      yield put({
        type: 'FETCH_RETRY',
        error
      });
    }
  }
}
```
* 撤销
  * reducer基于past, present, future
```js
// 利用race和delay实现用户可在5s内撤销
const { undo, archive } = yield race({
  undo: take('UNDO'),
  archive: delay(5000)
});
if (undo) {
  // undo
} else if (archive) {
  // continue
}
```

#### 外部资源

#### API参考
* saga
  * 是一个返回generator的函数，middleware会迭代这个generator并执行所有yield之后的effect
  * 第一次迭代，middleware会调用next获取下一个effect。generator被暂停，直到effect执行结束。generator收到effect的执行结果result后调用next(result)，此过程一直重复，直到generator结束或跑出错误
* join(task) / join(tasks[])
  * 创建一个effect描述信息，用来等待fork task执行结果
* cancel(task)
  * 取消一个fork task

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

 #### 帮助理解的博客文章
 * https://blog.csdn.net/juse__we/article/details/107598535

[原文链接](https://redux-saga-in-chinese.js.org/index.html)

2021.07.21