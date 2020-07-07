
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

/***
 * 1. 如果resolve、reject在then回调之前执行，那么在then中执行callback
 * 2. 如果resolve、reject在then回调之前执行，那么在resolve、reject中执行callback
 */
class Promise {

  constructor(excutor) {
    this.status = PENDING;
    this.data;
    this.callback = []; //callback结构为{ resolve: function, reject: function }

    const resolve = (data) => {
      if (data instanceof Promise) {
        return value.then(resolve, reject);
      }
      if (this.status !== PENDING) {
        return;
      }

      this.status = RESOLVED;
      this.data = data;
      this.callback.forEach(({ resolve }) => resolve(data));
    }

    const reject = (reason) => {
      if (this.status !== PENDING) {
        return;
      }

      this.status = REJECTED;
      this.data = reason;
      this.callback.forEach(({ reject }) => reject(reason));
    }

    try {
      excutor(resolve, reject);
    } catch(error) {
      reject(error);
    }
  }

  /**
   * 异步执行，返回一个新的promise，新的promise data为callback的执行结果
   */
  then(onResolve, onReject) {
    onResolve = typeof onResolve === 'function' ? onResolve : value => value;
    onReject = typeof onReject === 'function' ? onReject : reason => { throw reason };

    return new Promise((resolve, reject) => {
      const handle = (callback) => {
        try {
          const res = callback(this.data);
          if (res instanceof Promise) { // 如果结果为promise，执行结果的then方法
            res.then(resolve, reject);
          } else { // 否则执行新promise的resolve方法
            resolve(res);
          }
        } catch(error) { // 如果执行中抛出错误，需捕获错误，并将新promise的状态变为rejected
          reject(error);
        }
      }

      setTimeout(() => {
        if (this.status === PENDING) { // 如果状态为pending，push到callback中等待resolve或rejected执行
          this.callback.push({
            resolve: () => handle(onResolve),
            reject: () => handle(onReject),
          });
        } else if (this.status === RESOLVED) { // 如果状态为resolve，直接执行onResolve，并将执行结果传递给新的promise中
          handle(onResolve);
        } else if (this.status === REJECTED) { // 如果状态为rejected，直接执行onReject，并将执行结果传递给新的promise中
          handle(onReject);
        }
      }, 0);
    });
  }

  catch(onReject) {
    return this.then(null, onReject);
  }

  static resolve(value) {
    return new Promise((resolve) => {
      resolve(value);
      });
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
      });
  }

  static all(promises) {
    const res = new Array(promises.length);
    let finishedLength = 0;
    return new Promise((resolve, reject) => {
      promises.forEach((p, index) => {
        p.then(
          value => {
            res[index] = value;
            finishedLength++;
            if (finishedLength === promises.length) {
              resolve(res);
            }
          },
          reason => {
            res[index] = reason;
            finishedLength++;
            if (finishedLength === promises.length) {
              reject(res);
            }
          }
        )
      });
    });
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((p) => {
        p.then(
          value => resolve(value),
          reason => reject(reason)
        )
      })
    });
  }
}
