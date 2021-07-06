### React

##### 工具链
* create-react-app: 创建一个单页应用
* Next.js: Node构建服务端渲染（包含开箱即用的样式和路由方案）
* Gatsby: 构建面向内容的静态网站（HTML和css最快速度加载）
* Neutrino: 把webpack的功能简单预设在一起
* Parcel: 快速、零配置打包器
* Razzle: 无需配置的服务端渲染框架
——————
一组 JavaScript 构建工具链
* 一个package管理器：npm或yarn
* 一个打包器：webpack或parcel
* 一个编译器：babel

##### JSX
* 关注点分离
* JSX本身已经实现了防XSS攻击
* 实际上是调用React.createElement()

##### 元素渲染
* React元素，是开销极小的普通对象，react dom会负责将dom更新到与react元素一致
* ReactDOM.render(reactElement, root);

##### state和生命周期
* setState((state, props) => {}); 参数为函数，同步
* 数据向下流动（自上而下或单向数据流）

##### 事件处理
* 不能通过return false来阻止默认行为，必须显式的调用preventDefault
* 在class组件中绑定this问题
  ```
  // 方法1
  constructor() {
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = () => {}
  <button onClick={this.handleClick}>

  // 方法2：实验性语法
  handleClick = () => {}
  <button onClick={this.handleClick}></button>

  // 方法3：有性能问题，每次渲染组件都会创建不同的回调函数; 建议在构造器中绑定或使用 class fields 语法
  handleClick() {}
  <button onClick={() => { this.handleClick()}}></button>
  ```

##### 状态提升
* 多个组件需要反映相同的变化数据，建议将共享状态提升到最近的共同父组件中去

##### 组合和继承
* Props和组合就可以完成功能，从而不需要继承。
* props可以传递任何形式的参数，包括React元素
* 如果需要复用非UI功能，可以单独开发一个js文件，import进来而不是通过继承

##### React哲学

##### 无障碍
* HOC，使用forwardRef函数来向被包裹的组件传递ref

##### 代码分割
* 由webpack等打包器支持
* 最佳方式：动态引入import
  ```
  import('/path').then(someExport => { }) // webpack解析到这里时，会自动进行代码分割
  ```
* React.lazy() + Suspense
  * React.lazy接收一个动态调用import的函数，返回resolve一个default export组件的promise
  * 然后在Suspense组件中渲染lazy组件，fallback接收组件加载过程中展示的React元素
  ```
  import SomeComponent = React.lazy(() => import('/path'));

  <Suspense fallback={<div>Loading...</div>}>
    <SomeComponent />
  </Suspense>
  ```
* 异常边界捕获
* 基于路由的代码分割
  ```
  import Home = React.lazy(() => import('./routes/Home));
  <Suspense>
    <Route exact path='/' component={Home} />
  </Suspense>
  ```
* 命名导出
  * 只支持默认导出（export default）
  * 可以创建一个中间模块

##### context
* 共享全局数据，如language、user、theme
* 避免层层传递数据
  ```
  const theme = { color: 'light' };
  const ThemeContext = React.createContext({
    dark: theme.color,
    toggle: (color) => { theme.color = color } }
  ); // light 初始值

  // warpper class组件
  <ThemeContext.Provider value="dark"> // dark 重新赋值
    <Tooltip />
  </ThemeContext.Provider>

  // Tooltip class组件
  <ThemedButton>

  // ThemedButton class组件
  static contextType = ThemeContext;
  <button style={{ color: this.context.color === 'dark' : '#000' : '#fff' }}>dark按钮</button> // dark
  ```

##### 错误边界
  * static getDerivedStateFromError() 用来渲染备用UI
  * componentDidCatch() 可以用来捕获或上报错误
  * 捕获子组件，但不能捕获到自身的错误
  * 不能捕获事件处理器内部的错误，使用try catch处理
  * react16后错误会导致整个组件数被卸载
    * 展示错误的信息比不展示更糟糕

##### Ref

##### 高级组件（HOC）
* 高级组件和容器组件
  * 容器组件分离高层和底层，由容器管理状态，将prop传递以渲染UI
  * HOC参数化容器组件
* connect
* 不要在render中使用HOC, 每次都返回一个新的组件，diff算法会卸载旧的dom树挂载新的dom树
* 复制静态方法（hoistNonReactStatic(Enhance, WrappedComponent);）
* refs不会被传递（React.forwardRef）

##### 性能优化
* 虚拟化长列表（虚拟滚动）
* 避免调停
  * shouldComponentUpdate 提速
  * React.PureComponent代替shouldComponentUpdate return false
    * 用当前state和props进行浅比较

##### protals
* 把子节点渲染到父节点以外的节点
  * ReactDOM.createPortal(child, container)

##### profiler API
* 测量react应用多久渲染一次以及渲染一次的代价
  ```<Profiler id="Navigation" onRender={callback}>{...}</Profiler>```

##### 不使用ES6
* create-react-class
  ```
  var createReactClass = require('create-react-class');
  var Greeting = createReactClass({
    render: function() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  });
  ```
* 声明默认属性 defaultProps
  ```
  class Greeting extends React.Component {
    // ...
  }

  Greeting.defaultProps = {
    name: 'Mary'
  };
  ```

##### 不使用JSX
* React.createElement(component, props, ...children)

##### 协调
* diff
  * O(n 3 ) -> O(n)

##### refs
* 函数组件没有示例，不能使用ref属性，但可以用forwardRef。或useRef
* ref转发：使组件可以像暴露自己的 ref 一样暴露子组件的 ref
* ref回调
  * 更新过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM 元素，因为React 清空旧的 ref 并且设置新的。可以使用React.CreateRef避免这个问题

##### Render Props
*  render prop 的组件接受一个函数，该函数返回一个React元素并调用和渲染UI
*  在React.PureComponent中使用render props不能起到优化作用，因为每一次浅比较props都会返回false

##### 静态类型检查
* Flow
* TypeScript

##### 严格模式
* StrictMode组件
  * 突出显示应用程序中潜在问题的工具
  * 不会渲染可见的 UI
  ```
  <React.StrictMode>
    {...}
  </React.StrictMode>
  ```
  * 识别不安全的生命周期
    关于使用过时字符串 ref API 的警告
    关于使用废弃的 findDOMNode 方法的警告
    检测意外的副作用
    检测过时的 context API

##### PropTypes

##### web component

##### React.memo
* 是一个高级组件，参数是一个函数组件
* 与React.PureComponent相似，但只适用于函数组件
* 如果组件在相同 props 的情况下渲染相同的结果，那么将其包装在 React.memo 中调用，通过记忆组件渲染结果的方式来提高组件的性能表现
* React.memo 仅检查 props 变更
* 如果函数组件被 React.memo 包裹，且其实现中拥有 useState，useReducer 或 useContext 的 Hook，当 context 发生变化时，它仍会重新渲染
* 默认情况下其只会对复杂对象做浅层对比
* 不要依赖它来“阻止”渲染，因为这会产生 bug

##### React.cloneElement()
* React.cloneElement(element, [props], [...children])
* 保留了组件的 ref
* 几乎等同于<element.type {...element.props} {...props}>{children}</element.type>

##### React.createFactory(type)
* 返回用于生成指定类型 React 元素的函数
* React.createElement()相似，参数可以是div\span等HTML便签也可以React组件类型
* 已废弃，使用 JSX 或直接调用 React.createElement()

##### React.Children
* 提供了用于处理 this.props.children 不透明数据结构的实用方法
  * React.Children.map(children, function[(thisArg)])
    * 如果children是Fragment对象，不会被遍历，因为被视为单一子节点的情况处理
  * React.Children.forEach(children, function[(thisArg)])
  * React.Children.count(children)
  * React.Children.only(children) 是否是单一子节点，是就返回该子节点，否抛出错误
  * React.Children.toArray(children)
    * 以数组的方式扁平展开并返回，并为每个子节点分配一个 key。

##### React.forwardRef
* 创建一个React组件，该组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中
* 常见于两个场景
  * 转发 refs 到 DOM 组件
  * 在高阶组件中转发 refs
  ```
  const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
      {props.children}
    </button>
  ));

  const ref = React.createRef();
  <FancyButton ref={ref}>Click me!</FancyButton>;
  ```

##### React.Component
* react组件重用的方式是组合而不是继承
* 生命周期
  * 挂载
    * constructor
    * static getDerivedStateFromProps
    * render
    * componentDidMount
  * 更新
    * 新props/setState/forceUpdate
    * getDerivedStateFromProps
    * shouldComponentUpdate(forceUpdate不调用)
    * render
    * getSnapshotBeforeUpdate
    * componentDidUpdate
  * 卸载
    * componentWillUnmount
  * 错误处理
    * static getDerivedStateFromError()
    * componentDidCatch
  * render:
    * 纯函数
  * constructor:
    * 不初始化 state 或不进行方法绑定，可以不实现
    * 避免将 props 的值复制给 state，只有在刻意忽略 prop 更新的情况下使用
  * componentDidMount
    * 插入DOM树中后立即调用
    * 处理网络请求获取数据等数据初始化工作、添加订阅
    * 可以调用 setState()，会触发额外渲染，但会发生在浏览器更新屏幕之前，这样即使调用两次render，用户也不会看到中间状态
  * componentDidUpdate(prevProps, prevState, snapshot)
    * 可以调用setState，但必须包裹在条件语句里，否则会产生死循环
      ```
      componentDidUpdate(prevProps) {
        // 典型用法（不要忘记比较 props）：
        if (this.props.userID !== prevProps.userID) {
          this.fetchData(this.props.userID);
        }
      }
      ```
  * componentDidUnmount
    * 清理工作：取消订阅等
  * shouldComponentUpdate(nextProps, nextState)
    * 不建议手动编写该周期函数，建议使用React.PureComonent
    * 可以将 this.props 与 nextProps 以及 this.state 与nextState 进行比较，并返回 false 以告知 React 可以跳过更新
    * 不建议在 shouldComponentUpdate() 中进行深层比较或使用 JSON.stringify()。这样非常影响效率，且会损害性能
    * static getDerivedStateFromProps(props, state)
      * 在调用 render 方法之前调用，应返回一个对象来更新 state
      * 适用场景
        * state 的值在任何时候都取决于 props，比如Transition
      * 与UNSAFE_componentWillReceiveProps 相比
        * UNSAFE_componentWillReceiveProps只会在父组件重新渲染时触发
        * getDerivedStateFromProps每次渲染前（父组件诱发更新+内部setState）
  * getSnapshotBeforeUpdate(prevProps, prevState)
    * 在最近一次渲染输出（提交到 DOM 节点）之前调用，应返回 snapshot 的值或null
    * 使用场景
      * 处理UI，比如能获得滚动位置
        ```
          getSnapshotBeforeUpdate(prevProps, prevState) {
          // 我们是否在 list 中添加新的 items ？
          // 捕获滚动​​位置以便我们稍后调整滚动位置。
          if (prevProps.list.length < this.props.list.length) {
            const list = this.listRef.current;
            return list.scrollHeight - list.scrollTop;
          }
          return null;
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
          // 如果我们 snapshot 有值，说明我们刚刚添加了新的 items，
          // 调整滚动位置使得这些新 items 不会将旧的 items 推出视图。
          //（这里的 snapshot 是 getSnapshotBeforeUpdate 的返回值）
          if (snapshot !== null) {
            const list = this.listRef.current;
            list.scrollTop = list.scrollHeight - snapshot;
          }
        }
        ```
  * setState
    * 将对组件 state 的更改排入队列，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件
    * 批量推迟更新: componentDidUpdate 或者 setState 的回调函数（setState((state, props) => stateChange, callback)）在应用更新后触发
  * component.forceUpdate(callback)
    * 会跳过自身的shouldComponentUpdate，但子组件不会跳过shouldComponentUpdate

生命周期 16.4版本之后
![生命周期](https://raw.githubusercontent.com/EarlyBirdss/FrontEnd-Notes/feature-general/images/react-life-circle.png)

##### DOM元素
* ARIA 提供了多种向元素添加标签和说明的机制，比如aria-label：指定一个用作可访问标签的字符串

##### 合成实践
* SyntheticEvent包装器
* SyntheticEvent 是合并而来，因此SyntheticEvent 对象可能会被重用，而且在事件回调函数被调用后，所有的属性都会无效。出于性能考虑，不能通过异步访问事件

##### Test Utilities
* 测试框架, React 组件测试
* act()

##### Test Renderer
* 提供了一个 React 渲染器，用于将 React 组件渲染成纯 JavaScript 对象，无需依赖 DOM 或原生移动环境
  ```
  import TestRenderer from 'react-test-renderer';

  function Link(props) {
    return <a href={props.page}>{props.children}</a>;
  }

  const testRenderer = TestRenderer.create(
    <Link page="https://www.facebook.com/">Facebook</Link>
  );

  console.log(testRenderer.toJSON());
  // { type: 'a',
  //   props: { href: 'https://www.facebook.com/' },
  //   children: [ 'Facebook' ] }
  ```

##### JavaScript环境
* React16依赖Set和Map

### Hook

##### 简介
* 动机
  * 组件之间复用逻辑很难
    * 之前组件复用的解决方案：HOC和render props
      * 需要重新组织组件结构
      * 代码难以理解
      * 各种抽象层组件可以能会形成嵌套地狱
    * Hook可以从组件中提取状态逻辑，在不更改组件结构的情况下复用状态逻辑
  * 复杂组件难以理解
    * 一个生命周期函数可能包含多个逻辑处理，不相关的代码却在一个方法中组合到一起
    * Hook可以将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）
  * 难以理解的class
    * 难以理解的this
    * 需要绑定事件处理器
    * 函数组件和class组件的差异，和使用场景区分
    * Hook 可以在非 class 的情况下可以使用更多的 React 特性

##### 概览
* useState
* useEffect
  * componentDidMount、componentDidUpdate 和 componentWillUnmount
  * 副作用函数还可以通过返回一个函数来指定如何“清除”副作用(componentWillUnmount)
  * 使用规则
    * 只能在函数最外层调用hook。不能在条件、循环、子函数中
    * 只能在react函数组件中调用hook
  * 自定义hook
    * 复用状态逻辑（复用逻辑而不是state）

##### State Hook

##### Effect Hook
* 执行DOM更新后调用effect（不传入第二个参数的情况下）
* React保证每次运行 effect 的同时，DOM 都已经更新完毕。
* 每次重新渲染，都会生成新的 effect，替换掉之前的
* effect不会阻塞浏览器更新屏幕
* effect的清除阶段在每次重新渲染时都会执行（忘记正确地处理 componentDidUpdate 是 React 应用中常见的 bug 来源）
* React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect

##### Hook 规则
* 为什么 Hook 需要在我们组件的最顶层调用：只要 Hook 的调用顺序在多次渲染之间保持一致，React 就能正确地将内部 state 和对应的 Hook 进行关联

##### 自定义Hook
* 必须以use开头，React可以检查自定义hook是否违反规则
* 重用起来的hook在多个调用组件中state和副作用是隔离的

##### Hook API
* useState
  * 惰性初始 state
    * useState(() => { const initialValue = doSomething(); return initialValue; });
  * 跳过state更新
    * setState传入当前state时，react会跳过子组件渲染和effect执行
* useEffect
  * 处理副作用
  * 所有 effect 函数中引用的值都应该出现在依赖项数组中
  * effect在浏览器完成布局和绘制后，在一个延迟事件中调用
  * useLayoutEffect与useEffect相似，只是会在浏览器绘制前调用
* useContext
  * 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。
* useCallback
  * 返回一个memoized 回调函数
  * useCallback(fn, deps)相当于useMemo(() => fn, deps)
  * 回调函数只有在desp（依赖数组）变化时，才会更新
  * 使用场景
    * 回调函数传递给使用shouldComponent等优化手段的子组件时
* useMemo
  * 返回一个 memoized 值
  * useMemo(() => fn, deps)
  * 只有在依赖数组变化时，才更新memoized值
  * useMemo会在整个渲染周期执行，不要在函数内容执行与渲染无关的值
* useRef

##### Hook FAQ
* shouldComponentUpdate实现
  * 使用React.memo包裹一个函数组件，实现对props进行浅比较
* 避免重重传递回调
  * context传递一个useReducer的dispatch

