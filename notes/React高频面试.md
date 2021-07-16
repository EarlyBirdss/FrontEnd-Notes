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




[原文链接](https://www.bilibili.com/video/BV1H54y187W1)

2021.07.16