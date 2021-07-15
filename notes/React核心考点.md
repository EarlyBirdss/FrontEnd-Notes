### React核心考点

### 答题技巧
* 怎样避免心里知道，答不出来或答不彻底

#### React的优势到底在哪里？
前导
* 一个库，而不是一个框架(angular)
* 社区功能强大(react-router, redux)
* 上限与下限差距极大

答
* 一个JavaScript库,通过组件开发解决代码复用.适合拆分与模块化.高内聚低耦合.
* 一次学习,多处编写(跨平台).
* 没有提供完整的框架解决方案,需要向社区寻找不同的方案进行整合(要求方案整合能力)

#### 源码解读：JSX映射虚拟DOM
为什么选择JSX
* 对比方案: template模板
  * template模板引入了更多概念,增加了学习的成本.JSX更简单

#### 什么是数据流管理
* 单向数据流:
  * 父 -> 子: props
  * 子 -> 父: 回调函数
* context
  * Provider/Consumer: 数据层和展示层没有分离出来, 管理变得困难
* Flux
  * MVC: 大型项目很难管理
  * ACTION -> DISPATCHER -> STORE -> VIEW
  * VIEW -> ACTION -> DISPATCHER -> STORE -> VIEW
* Redux
  * 优点
    * 状态持久化: 组件销毁了,数据依然存在global中
    * 状态可回溯
  * 缺点
    * 修改一个状态需要改动几个文件
    * 状态残留: 公用一个状态的多个组件如果要重用需要进行合理的初始化
    * 交互可能有卡顿
    * 不支持ts

#### 什么是服务端渲染
* CSR客户端渲染
  * 白屏时间过长
  * HTML无内容, 不利于SEO
* SSR解决了什么问题
![SSR-流程](https://raw.githubusercontent.com/EarlyBirdss/FrontEnd-Notes/feature-general/images/SSR-process.png)

#### 服务端渲染原理刨析

#### React-Hooks 基本使用

#### React-Hooks 设计理念

#### Redux设计理念



[原文链接](https://www.bilibili.com/video/BV1AU4y187AU/?spm_id_from=333.788.b_7265636f5f6c697374.15)

2021.07.15