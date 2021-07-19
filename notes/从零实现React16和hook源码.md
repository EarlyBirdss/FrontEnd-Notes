### 从零实现React16和hook源码

#### messageChannel
* requestIdleCallback只有chrome支持，react实际使用messageChannel模拟了requestIdleCallback
* 创建一个消息通道，并通过它的两个messagePort属性发送数据
* messageChannel是一个宏任务

#### 单链表
* firstUpdate -> nextUpdate -> lastUpdate
```
let currentUpdate = firstUpdate;
while(currentUpdate) {
    // ...执行一些操作
    currentUpdate = firstUpdate.next
} // React源码实现里使用了非常多的while来遍历链表结构
```

#### fiber之前的协调
* React会遍历vituralDOM树，找出需要变动的节点，然后同步更新。
* 调和期间，react会一直占用浏览器资源，1. 可能会导致掉帧，2. 用户事件可能得不到响应
* 使用递归调用实现遍历，执行栈会越来越深，且不能中断

#### fiber
* 合理分配浏览器资源，提高用户响应速度
* 使用fiber架构，在调和阶段可中断，适时让出CPU执行权，让浏览器可以及时响应用户事件
* fiber是最小的工作单元，每次执行完一个工作单元，react就会检查还剩多少时间，如果没有时间了就让出控制权，预约下一个空闲时间

如果有以下dom结构
```jsx
<A>
    <B>
        <C1 />
        <C2 />
    </B>
</A>
```
fiber结构为（只含指针信息）
```js
A = { child: B1 };
B1 = { child: C1, sibing: B2, return: A };
B2 = { return: A };
C1 = { sibling: C2, return: B1 };
C2 = { return: B1 };
```
工作循环，requestIdleCallback参数
```js
let nextUnitOfWork = A;
function workLoop(deadline) {
  while ((deadline.timeRemaining() > 1 || dealline.didTimeout) && nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork) {
      commitRoot();
  } else {
    requestIdleCallback(workLoop, { timeout: 1000 })
  }
}
```
遍历阶段（从顶层节点出发，深度优先，先大儿子，再兄弟，再叔叔，直到再回到顶层节点）
```js
/**
* @params: fiber: 当前工作单元
* return 下一个工作单元
*/
function performUnitOfWork(fiber) {
  // 放在workLoop中的while和当前的while没有理解？？？？
  beginWork(fiber); // 打印
  if (fiber.child) {
    return fiber.child;
  }
  while(fiber) {
    // 如果没有儿子了就完成该工作单元，首次渲染时执行构建真实节点
    completeUnitOfWork(fiber); // 打印
    if (fiber.sibling) {
      return fiber.sibing;
    }
    fiber = fiber.return;
  }
}
// 打印结果：begin A -> begin B1 -> begin C1 -> complete C1 -> begin C2 -> complete C2 -> complete B1 -> begin B2 -> complete B2 -> complete A
```
创建真实的dom元素，创建fiber
```js
function beginWork(currentFiber) {
    if (currentFiber.tag === 'TAG_ROOT') { // container节点
        updateHostRoot(currentFiber);
    } else if (currentFiber.tag === 'TAG_TEXT') { // 文本节点
        updateHostText(currentFiber);
    } else if (currentFiber.tag === 'TAG_HOST' {
        updateHost(currentFiber);
    } else if (currentFiber.tag === 'TAG_CLASS') {
        updateClassComponent(currentFiber);
    } else if (currentFiber.tag === 'TAG_FUNCTION_COMPONENT') {
        updateFunctionComponent(currentFiber);
    }
}

function updateHostRoot(currentFiber) {
    let newChilren = currentFiber.props.children; // virturalDom
    reconcilerChildren(currentFiber, newChildren);
}

function reconcilerChildren(currentFiber, newChildren) {
    let newChildIndex = 0;
    let prevSibling = null;
    while(newChildIndex < newChildren.length) {
        let newChild = newChildren[newChildIndex];
        let tag;
        if (newChild.type === 'ELEMENT_TEXT') {// 文本节点
            tag = 'TAG_TEXT';
        } else if (typeof newChild.type === 'string') { // 原生标签
            tag = 'TAG_HOST';
        }
        const newFiber = {
            tag,
            type: newChild.type,
            stateNode: null, // 真实DOM节点
            props: newChild.props,
            return: currentFiber,
            effectTag: 'PLACEMENT',
            nextEffect: null,
        };
        if (newFiber) { // 这个判断干嘛的？？？
            if (newChildIndex === 0) {
                currentFiber.child = newChild;
            } else {
                prevSibing.sibling = newFiber;
            }
            prevSibing = newFiber;
        }
        newChildIndex++;
    }
}

function updateHostText(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);
    }
}

function updateHost(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);
    }

    const newChildren = currentFiber.props.children;
    reconcilerChildren(currentFiber, newChildren);
}

function createDOM(currentFiber) {
    if (currentFiber.tag === 'TAG_TEXT') {
        return document.createTextNode(currentFiber.props.text);
    } else if (currentFiber.tag === 'TAG_HOST') {
        const stateNode = document.createElement(currentFiber.type);
        updateDOM(stateNode, {}, currentFiber.props); // 设置属性
        return stateNode;
    }
}

function updateDOM(stateNode, oldProps, newProps) {}
```
收集effectList
```js
function completeUnitOfWork(currentFiber) {
    const returnFiber = currentFiber.return;
    if (returnFiber) {
        if (!returnFiber.firstEffect) {
            returnFiber.firstEffect = currentFiber.firstEffect;
        }
        if (currentFiber.lastEffect) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber.lastEffect;
            }
            currentFiber.lastEffect = currentFiber.lastEffect;
        }
        if (currentFiber.effectTag) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber;
            } else {
                returnFiber.firstEffect = currentFiber;
            }
            returnFiber.lastFiber = currentFiber;
        }
    }
}
```
提交阶段
```js
let workInProgressRoot = A;
function commitRoot() {
    deletions.forEach(commitWork); // 删除首先执行
    let currentFiber = workInProgressRoot.firstEffet;
    while(currentFiber) {
        commitWork(currentFiber);
        currentFiber = currentFiber.nextEffect;
    }
    workInProgressRoot = null;
}

function commitWork(currentFiber) {
    const returnFiber = currentFiber.return;
    if (currentFiber.effectTag === 'PLACEMENT') {
        returnFiber.stateNode.appendChild(currentFiber.stateNode);
    } else if (currentFiber.effectTag === 'DELETION') {
        returnFiber.stateNode.removeChild(currentFiber.stateNode);
    }
}
```

#### fiber双缓存（非初次渲染时）
优化原因：不停的创建新的fiber又回收fiber浪费性能
```js
let currentRoot = null;
let nextUnitOfWork = null;
let workInProgressRoot = null;
let deletions = []; // 要删除的节点并没有放在effectList中
function scheduleRoot(rootFiber) {
    if (currentRoot && currentRoot.alternate) { // 不是第一次渲染也不是第一次更新（复用第一颗树）
        workInProgresssRoot = currentRoot.alternate;
        workInProfressRoot.alternate = currtRoot;
        if (rootFiber) workInProgressRoot.props = rootFiber.props;
    }
    if (currentRoot) { // 不是第一次渲染，但是第一次更新（第二棵树）
        if (rootFiber) {
            rootFiber.alternate = currentRoot;
            workInProgressRoot = rootFiber;
        } else {
            workInProgressRoot  = {
                ...currentRoot,
                alternate: currentRoot
            }
        }
    } else { // 第一次渲染(第一颗树)
        workInProgressRoot = rootFiber;
    }
    workInProgressRoot.firstEffect = workInProgressRoot.lastEffect = workInProgressRoot.nextEffect = null;
    nextUnitOfWork = workInProgressRoot;
}
```
更新阶段commitWork增加update操作
```js
function commitWork(currentFiber) {
    const returnFiber = currentFiber.return;
    if (currentFiber.effectTag === 'PLACEMENT') {
        returnFiber.stateNode.appendChild(currentFiber.stateNode);
    } else if (currentFiber.effectTag === 'DELETION') {
        returnFiber.stateNode.removeChild(currentFiber.stateNode);
    } else if (currentFier.effectTag === 'UPDATE') {
        if (currentFiber.type === 'ELEMENT_TEXT') {
            if (currentFiber.alternate.props.text !== currentFiber.props.text) {
                currentFiber.stateNode.textContent = currentFiber.props.text;
            }
        } else {
            updateDOM(currentFiber.stateNode, currentFiber.alternate.props, currentFiber.props)
        }
    }
}
```
更新阶段reconcileChildren增加新旧节点判断（通过alternate指针）
```js
function reconcilerChildren(currentFiber, newChildren) {
    let newChildIndex = 0;
    let prevSibling = null;
    let newFiber;
    const oldFiber = currentFiber.alternate && currentFiber.alternate.child;
    oldFiber.firstEffect = oldFiber.lastEffect = oldFiber.nextEffect = null;
    while(newChildIndex < newChildren.length) {
        let newChild = newChildren[newChildIndex];
        let tag;
        const sameType = oldFiber && newChild && oldFiber.type === newChild.type;
        if (newChild && newChild.type === 'ELEMENT_TEXT') {// 文本节点
            tag = 'TAG_TEXT';
        } else if (newChild && typeof newChild.type === 'string') { // 原生标签
            tag = 'TAG_HOST';
        }
        if (sameType) {
            newFiber = oldFiber;
            newFiber.props = newChild.props;
            newFiber.effectTag = 'UPDATE';
            newFiber.alternate = oldFiber;
            newFiber.nextEffect = null;
        } else {
            if (newChild) {
                newFiber = {
                    tag,
                    type: newChild.type,
                    stateNode: null, // 真实DOM节点
                    props: newChild.props,
                    return: currentFiber,
                    effectTag: 'PLACEMENT',
                    nextEffect: null,
                };
            }
            if (oldFiber) {
                oldFiber.effectTag = 'DELETION';
            }
        }
        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }
        if (newFiber) { // 这里判断是干嘛？？？ fiber可以在更新阶段被删除了，可能为null
            if (newChildIndex === 0) {
                currentFiber.child = newChild;
            } else {
                prevSibing.sibling = newFiber;
            }
            prevSibing = newFiber;
        }
        newChildIndex++;
    }
}
```

#### 实现类组件
```js
class Component {
    constructor(props) {
        this.props = props;
        this.updateQueue = new UpdateQueue();
    }

    setState(payload) {
        let update = new update(payload);
        this.updateQueue.enqueueUpdate(update);
        scheduleRoot();
    }
}
Component.protype.isReactComponent = {};

class Update {
    constroctor(payload) {
        this.payload = payload;
    }
}

class UpdateQueue {
    constructor() {
        this.firstUpdate = null;
        this.lastUpdate = null;
    }
    enqueueUpdate(update) {
        if (this.lastUpdate === null) {
            this.firstUpdate = this.lastUpdate = update;
        } else {
            this.lastUpdate.nextUpdate = update;
            this.lastUpdate = update;
        }
    }
    forceUpdate(state) {
        let currentUpdate = this.firstUpdate;
        while (currentUpdate) {
            let nextState = typeof currentUpdate.payload === 'function' ? currentUpdate.payload() : currentUpdate.payload;
            state = { ...state, ...nextState };
            currentUpdate = currentUpdate.nextUpdate;
        }
        this.firstUpdate = this.lastUpdate = null;
        return state;
    }
}

function updateClassComponent(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = new currentFiber.type(currentFiber.props);
        currentFiber.stateNode.internalFiber = currentFiber;
        currentFiber.updateQueue = new UpdateQueue();
    }
    currentFiber.stateNode.state = currentFiber.updateQueue.forceUpdate();
    let newElement = currentFiber.stateNode.render();
    const newChildren = [newElement];
    reconsolerChiren(currentFiber, newChildren);
}
```
更新reconcilerChildren代码实现
```js
function reconcilerChildren(currentFiber, newChildren) {
    let newChildIndex = 0;
    let prevSibling = null;
    let newFiber;
    const oldFiber = currentFiber.alternate && currentFiber.alternate.child;
    oldFiber.firstEffect = oldFiber.lastEffect = oldFiber.nextEffect = null;
    while(newChildIndex < newChildren.length) {
        let newChild = newChildren[newChildIndex];
        let tag;
        const sameType = oldFiber && newChild && oldFiber.type === newChild.type;
        if (newChild && typeof newChild.type === 'function' && newChild.type.proprotype.isReactComponent) {
            tag = 'TAG_CLASS';
        } else if (newChild && newChild.type === 'ELEMENT_TEXT') {// 文本节点
            tag = 'TAG_TEXT';
        } else if (newChild && typeof newChild.type === 'string') { // 原生标签
            tag = 'TAG_HOST';
        }
        if (sameType) {
            if (oldFiber.alternate) {
                newFiber = oldFiber;
                newFiber.props = newChild.props;
                newFiber.effectTag = 'UPDATE';
                newFiber.alternate = oldFiber;
                newFiber.updateQueue = oldFiber.updateQueue || new UpdateQueue();
                newFiber.nextEffect = null;
            } else {
                newFiber = {
                    tag,
                    type: newChild.type,
                    stateNode: null, // 真实DOM节点
                    props: newChild.props,
                    return: currentFiber,
                    effectTag: 'PLACEMENT',
                    updateQueue: oldFiber.updateQueue || new UpdateQueue(),
                    nextEffect: null,
                };
            }
        } else {
            if (newChild) {
                newFiber = {
                    tag,
                    type: newChild.type,
                    stateNode: null, // 真实DOM节点
                    props: newChild.props,
                    return: currentFiber,
                    effectTag: 'PLACEMENT',
                    updateQueue: oldFiber.updateQueue || new UpdateQueue(),
                    nextEffect: null,
                };
            }
            if (oldFiber) {
                oldFiber.effectTag = 'DELETION';
            }
        }
        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }
        if (newFiber) { // 这里判断是干嘛？？？ fiber可以在更新阶段被删除了，可能为null
            if (newChildIndex === 0) {
                currentFiber.child = newChild;
            } else {
                prevSibing.sibling = newFiber;
            }
            prevSibing = newFiber;
        }
        newChildIndex++;
    }
}
```
更新commitWork代码实现
```js
function commitWork(currentFiber) {
    let returnFiber = currentFiber.return;
    // 向下找能挂载的容器(真实节点)
    while (returnFiber.tag !== 'TAG_HOST' && returnFiber.tag !== 'TAG_ROOT' && returnFiber.tag !== 'TAG_TEXT') {
        returnFiber = returnFiber.return;
    }
    if (currentFiber.effectTag === 'PLACEMENT') {
        if (nextFiber.tag === 'TAG_CLASS') return;
        // 向下找能挂载的真实节点
        let nextFiber;
        while (nextFiber.tag !== 'TAG_HOST' && nextFiber.tag !== 'TAG_ROOT' && nextFiber.tag !== 'TAG_TEXT') {
            returnFiber = nextFiber.return;
        }
        returnFiber.stateNode.appendChild(currentFiber.stateNode);
    } else if (currentFiber.effectTag === 'DELETION') {
        commitDeletion(currentFiber, returnFiber.stateNode);
    } else if (currentFier.effectTag === 'UPDATE') {
        if (currentFiber.type === 'ELEMENT_TEXT') {
            if (currentFiber.alternate.props.text !== currentFiber.props.text) {
                currentFiber.stateNode.textContent = currentFiber.props.text;
            }
        } else {
            updateDOM(currentFiber.stateNode, currentFiber.alternate.props, currentFiber.props)
        }
    }
}

function commitDeletion(currentFiber, domReturn) {
    if (currentFiber.tag === 'TAG_HOST' || currentFiber.tag === 'TAG_TEXT') {
       domReturn.removeChild(currentFiber.stateNode);
    } else {

    }
}
```

#### 实现函数组件
```js
let workInProgressFiber = null;
let hookIndex = 0;
function useReducer(reducer, initialValue) {
    let newHook = workInProgressFiber.alternate && workInProgressFiber.alternate.hooks && workInProgressFiber.alternate.hooks[hookIndex];
    if (newHook) {
        newHook = newHook.updateQueue.forceUpdate(newHook.state);
    } else {
        newHook = {
            state: intialValue,
            updateQueue: new updateQueue(),
        }
    }
    const dispatch = action => {
        let payload = reducer ? reducer(newHook.state, action) : action;
        newHook.updateQueue.enqueueUpdate(new Update(payload));
        scheduleRoot();
    }
    workInProgressFiber.hooks[hookIndex++] = newHook;
    return [newHook.state, dispatch];
}
```
```js
function useState(initialValue) {
    return useState(null, initialValue);
}
```
```js
function updateFunctionComponent(currentFiber) {
    workInProgressFiber = currentFiber;
    hookIndex = 0;
    workInprogressFiber.hooks = [];
    const newChildren = [currentFiber.type(currentFiber.props)];
    reconcilerChildren(currentFiber, newChildren);
}
```
更新reconcilerChildren代码实现
```js
function reconcilerChildren(currentFiber, newChildren) {
    let newChildIndex = 0;
    let prevSibling = null;
    let newFiber;
    const oldFiber = currentFiber.alternate && currentFiber.alternate.child;
    oldFiber.firstEffect = oldFiber.lastEffect = oldFiber.nextEffect = null;
    while(newChildIndex < newChildren.length) {
        let newChild = newChildren[newChildIndex];
        let tag;
        const sameType = oldFiber && newChild && oldFiber.type === newChild.type;
        if (newChild && typeof newChild.type === 'function' && newChild.type.proprotype.isReactComponent) {
            tag = 'TAG_CLASS';
        } else if (newChild && typeof newChild.type === function) {
            tag = 'TAG_FUNCTION_COMPONENT';
        } else if (newChild && newChild.type === 'ELEMENT_TEXT') {// 文本节点
            tag = 'TAG_TEXT';
        } else if (newChild && typeof newChild.type === 'string') { // 原生标签
            tag = 'TAG_HOST';
        }
        if (sameType) {
            if (oldFiber.alternate) {
                newFiber = oldFiber;
                newFiber.props = newChild.props;
                newFiber.effectTag = 'UPDATE';
                newFiber.alternate = oldFiber;
                newFiber.updateQueue = oldFiber.updateQueue || new UpdateQueue();
                newFiber.nextEffect = null;
            } else {
                newFiber = {
                    tag,
                    type: newChild.type,
                    stateNode: null, // 真实DOM节点
                    props: newChild.props,
                    return: currentFiber,
                    effectTag: 'PLACEMENT',
                    updateQueue: oldFiber.updateQueue || new UpdateQueue(),
                    nextEffect: null,
                };
            }
        } else {
            if (newChild) {
                newFiber = {
                    tag,
                    type: newChild.type,
                    stateNode: null, // 真实DOM节点
                    props: newChild.props,
                    return: currentFiber,
                    effectTag: 'PLACEMENT',
                    updateQueue: oldFiber.updateQueue || new UpdateQueue(),
                    nextEffect: null,
                };
            }
            if (oldFiber) {
                oldFiber.effectTag = 'DELETION';
            }
        }
        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }
        if (newFiber) { // 这里判断是干嘛？？？ fiber可以在更新阶段被删除了，可能为null
            if (newChildIndex === 0) {
                currentFiber.child = newChild;
            } else {
                prevSibing.sibling = newFiber;
            }
            prevSibing = newFiber;
        }
        newChildIndex++;
    }
}
```

#### 其他
1. vue 与 react
* vue每次只更新一个组件，而react从root开始协调更新任务大有性能问题所以引入fiber进行可中断的更新


#### 疑问梳理（答案不一定对）
1. 每一帧的浏览器空闲时间里，只执行一个fiber任务还是，取出所有任务全部执行完才释放浏览器执行权？
    * 由于workLoop中deadline.timeRemaining()是实时调用，所以每一次处理完一个fiber任务都会再检查剩余时间，即在一个帧的空闲时间内，能处理多少fiber任务就处理多少fiber任务
2. react源码中大量的全局变量，为什么不使用单例模式呢？




[该版本的源码实现调用栈流程参见](https://github.com/EarlyBirdss/FrontEnd-Notes/blob/feature-general/xmind/React16%2B.xmind)
[原文链接](https://www.bilibili.com/video/BV16V411672B?p=2&spm_id_from=pageDriver)

2021.07.18
