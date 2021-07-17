### React 高频面试

#### 1. 请说一下你的React的理解
* React是什么
  * 用于构建用户界面的JavaScript库
* React是做什么的
  * 可以通过组件化的方式构建快速响应的大型web项目
* React是如何做的
  * 声明式：使用声明式编写界面，
  * 组件化
  * 一次学习，随处编写
* React的优缺点
  * 优点
    * 开发团队和社区强大
    * 一次学习，随处编写
    * API比较简洁
  * 缺点
    * 没有官方系统解决方案，造型成本高
    * 过于灵活，不容易写出高质量的应用
  * 扩展
    * JSX实现声明式
    * 虚拟dom实现跨平台
    * React使用的设计模式

#### 2. 为什么React会引入JSX
* 解释概念
  * JSX是一个JavaScript语法扩展，JSX看起来与HTML语法相似，降低了学习成本，更方便描述UI需要展示的样子
  * JSX是createElement的语法糖，通过babel转换
* 想实现什么目的
  * 需要实现声明式
  * 代码结构需要非常清晰和简洁，可读性强
  * 结构样式和时间能够高内聚低耦合，方便重用和组合
  * 不想引入新的概念和语法，只写JavaScript
* 有哪些可选方案，为什么这个方案更好
  * Vue.js使用了基于HTML的模板语法，引入了太多概念，比如控制器、作用域等等，增加了学习成本
* JSX的工作原理
  * 抽象语法树
  * babel工作流

#### 请说一下你对Virtual DOM的理解
* 是什么
  * React.createElement函数所返回的一个虚拟DOM
  * 虚拟DOM是一个JavaScript对象
* 能做什么
  *
* 如何做的？核心工作原理
* 优缺点
  * 优点
    * 处理了浏览器兼容性问题，避免用户操作真实dom
    * 内容经过了xss处理，可以防范xss攻击
    * 容易实现跨平台开发应用
    * 更新时可以实现差异化更新，减少dom操作
  * 缺点
    * 虚拟dom需要消耗额外内存
    * 首次渲染不一定更快
      * 需要先构建虚拟dom再根据虚拟dom构建真实dom
      * 更新的时候快
#### 4 函数组件和类组件的相同点和不同点
* 相同点
  * 都可以接受属性并且返回React元素
* 不同点
  * 编程思想不同：类组件需要创建实例，是基于面向对象；函数组件不需要创建实例，接收输入返回输出，是基于函数式编程写的
  * 内存占用：类组件需要创建并保存实例，会占用一定内存，函数组件不需要创建实例，可以节约内容占用
  * 捕获特性：函数组件具有值捕获特性（当时的值是什么就是什么，而this.state只能获取最新的state值）
  ```
  class ClassComponent extend React.Component {
    state = { number: 1 };
    handleClick = () => {
      setTimeout(() => { console.log(this.state.number)}, 3000); // 2
      this.setState({ number: this.state.number + 1 });
    }
    render() {
      return <button onClick={this.handleClick}>++</button>
    }
  }

  function FunctionComponent() {
    const [number, setNumber] = useState(1);
    handleClick = () => {
      setTimeout(() => { console.log(number)}, 3000); // 1
      setNumber({ number: number + 1 });
    }
    return <button onClick={handleClick}></button>
  }
  ```
  * 可测试性：函数式组件更方便编写单元测试
  * 状态：类组件有自己的实例，可以定义状态，可以修改状态更改组件；函数式hook之前没有状态，现在可以使用useState使用状态
  * 生命周期：类组件有自己完整的生命周期，可以在生命周期内编写逻辑；函数组件以前没有生命周期，现在可以通过useEffect等hook实现类似于生命周期的功能
  * 逻辑复用：类组件可以通过组件组合或高级组件、renderProps实现逻辑复用，函数组件可以使用自定义hook实现更细粒度的逻辑复用
  * 跳过更新：类组件可以通过shouldComponentUpdate或直接继承React.PureComponent来跳过更新，而函数式组件可以使用React.memo来跳过，或通过useMemo useCallback来进行性能优化
  * 发展前景：未来函数式组件将成为主流，它可更好的屏蔽this问题，规范和复用逻辑，更好的适合时间分片和并发渲染

##### 5 请说一下React的渲染流程
* 宏观设计理念
  * 跨平台：virtual Dom
  * 快速响应：异步可中断、增量更新
    * 性能瓶颈
      * js任务执行时间过长。浏览器刷新频率为60hz，即大约16.6ms刷细腻i次（60fps），js线程和渲染线程是互斥，如果js线程执行任务时间超过16.6ms，就会导致掉帧，卡顿。解决方案就是React利用空闲时间进行更新，不影响渲染进行
      * 把一个耗时的任务切分成一个个小任务，分布在每一帧里的方式就叫时间切片
    * 屏幕刷新率
      * 目前大多数设备的屏幕刷新率为60次/s
      * 浏览器的渲染动画或页面的每一帧的速率也需要跟设备屏幕的刷新保持一致。
      * 当每秒绘制的帧数（FPS）达到60时，页面时流程的，如果小于这个值，用户会感觉到卡顿
   * 帧
      * 每个帧（16.6ms内）包括js任务（宏任务、微任务，优先处理事件响应等高优先级任务），render阶段，如果执行完以上阶段仍有时间剩余，称为空闲时间
      * js引擎和页面渲染引擎在同一个线程，GUI渲染和js执行是互斥的
      * 如果某个任务执行时间过长，浏览器会推迟渲染
   * requestIdleCallback
      * 空闲时段内调用的函数排队
      * 正常帧任务完成后没超过16ms，说明时间有空闲，就会执行传入的函数任务
      * ReactDOM.unstable_createRoot(jsx, container); react设计每帧大概用掉5ms（浏览器自己的工作大概需要10ms），最后一次执行过程（更新到dom上）可能会更长
      * 目前的ReactDOM.render仍是同步执行，也使用了fiber结构，但是没有暂停
      * 由于requestIdleCallback的兼容性（只有chrome支持）React目前使用MessageChannel+requestAnimationFrame模拟了requestIdleCallback
      * 由于分片，componentWillMount、componentWillUpdate，componentWillReceiveProps会执行多次，所以废弃了
      * 一个fiber就是一个任务执行单元。react会先检查浏览器空闲剩余时间，如果时间不够，就交出控制权
  * react16+的渲染流程
    * schaduler（调度）：选择高优先级的任务进入reconciler
    * reconciler（调和）：计算变更内容（可以中断，异步）
    * react-dom（提交）：把变更的内容渲染到页面上
  * 源码
    * workLoop -> performUnitOfWork -> beginWork
    * beginWork(workInProgress) -> completeWork -> reconcilerChilder(workInProgrcess,nextChildren) -> creatFibers 构建子fiber链
    * completeUnitOfWork：没有儿子了就执行 -> createStateNode(构建真实的dom) -> makeEffectList(只有有副作用的fiber才会进入effectList，首次渲染时所有的fiber都在effctList，因为它们都需要插入到页面中)
    * fiber结构
    ```
    {
      &&type：, // react内部维护的type
      tag: // Fiber类型
      key: null, // 默认为null，diff时先比较ReactNode类型，类型相同再比较key
      stateNode,  // 对应的真实节点
      type: , // functionComponent/classComponent在这里标识.
      props: {
      children
      },
      // 链表结构
      child: // 第一个儿子
      sibing: // 下一个节点
      return: // 一般为父节点
    }
    ```
    * effectList结构（单链表）, 方便操作DOM元素
    ```
      firstEffect
      nextEffect
      lastEffect
    ```
    * 如果有以下DOM树，那么effectList的结构为（结合componentDidMount生命周期，很好理解）（归并）
    ```
    <Root> // react建造的最顶端的根节点
      <A>
        <B1 />
        <B2 />
      </A>
    </Root>
    // B1 -> B2 -> A
    // 假设父节点A有链表：1(firstEffect) -> (nextEffect) -> 2 -> (nextEffect) -> 3(lastEffect)
    //    子节点B有链表：4(firsetEffect) -> (nextEffect) -> 5(lastEffect)
    // 归并后，有链表   1(firstEffect) -> (nextEffct) -> 2 -> ... -> 3 -> ... -> 4 -> ... -> 5(lastEffect) -> B -> A  (...指nextEffect)
    ```
  * commitRoot
* 关键原理清晰描述，抽象与具体结合
* 结合工程实际

##### 请说一下React中的dom diff算法
* React17中是老的fiber树与最新的jsx对比生成最新的fiber的过程？
* react优化原则
  * 只对同层节点进行对比，如果DOM节点进行跨层级的移动，react不会复用
  * 不同的类型生成不同的树
  * 同类型的元素可以使用key来标识帮助react来识别是否变化
* 单节点
  1. 检查是否存在老fiber的dom元素
  2. 判断
      1. 如果存在，检查是否能复用，只有type和key都相同才复用
      2. 如果不存在，直接创建生成新的fiber节点
  3. 判断
      1. 如果可以复用，更新有变化的
      2. 如果不可以复用，给老fiber添加删除标记，再生成新的fiber节点
* 多节点
  * 多节点的操作有三种：新增、删除、更新
  * 可能会进行两次遍历，第一次处理属性的更新、第二次处理删除和新增和移动（2次遍历是因为实际项目中，更新的频率更高，是一种优化方案）（如果类型变化的更新（先删除再新增）也算更新在第一次遍历里）
  * 移动的原则是尽可能少动，如果一定要有一个要动那么新的位置中前面的不动后面的动
* 对比array list
  * 如果一旦发现key不一样就跳出第一个渲染
  * 第二次遍历建立一个map:（{key: fiber}形式）方便判断
  * 删除首先执行
  * 如果有需要移动的，新位置需要移到后面去的先移动
  * 不能使用index作为key的原因：假设第一个元素移到最后的一个位置，此时根据key对比，每一个元素都需要更新，而使用稳定的key值的话react可以判断只需要将第一个元素移动到最后一个位置就行了

#### 7. 请说一下你对React合成事件的理解
* 事件工作流
  1. 事件捕获
  2. 事件目标
  3. 事件冒泡
* 事件委托
* 先绑定后执行
* 合成事件
  * 把事件委托到document对象上（16版本，17版本绑定到容器上，ReactDOM.render的第二个参数）
  * 当真实DOM元素触发事件，先处理原生事件，然后会冒泡到document对象上，再处理react事件
  * React事件绑定是在reconciliation阶段，在原声事件的绑定前执行
  * 目的和优势
    * 进行浏览器兼容，React采用顶层事件代理机制，能够保证冒泡一致性
    * 事件对象可能会被频繁创建和回收，因此React引入事件池，在事件池中获取或释放事件对象（React17中废弃）
  * react注册dispatchEvent函数，react会在内部再模拟一遍捕获和冒泡机制


##### 疑问梳理自答（不一定对）
ReactNode，ReactElement区别
* ReactNode是typescript的类型，是react内部使用的。ReactElement就是react.CreateElement返回的react元素
Virtural Dom vs jsx vs fiber
* virtural dom是React.createElement的返回值
* jsx是语法，是babel转换React.createElement之前的结构树
* fiber是根据virtual dom转换的带有stateNode(真实dom指向)、first/sibing/return等指针内容的结构
fiber链表 vs effectList链表
* fiber链表是根据深度优先构造的链表结构，在beginWork阶段构建，根据nextChildren构建的
* effectList是归并的思想，从叶子结点开始，一步一步把自己的effect链表归并到父节点上，在归并到祖父节点上，一直到root，在complateWork阶段构建，方便进行dom操作。effectList也是fiber集，但只包含需要进行dom操作的fiber
老fiber和新jsx对比生成新fiber？？？fiber、jsx结构不同怎么对比？
* jsx指的是virtural dom


[原文链接](https://www.bilibili.com/video/BV1H54y187W1)

2021.07.16
