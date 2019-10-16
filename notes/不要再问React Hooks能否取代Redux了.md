#### redux一直是非强制性的
1. 如果你正在写的应用没有很多状态需要被存储，或者你的组件结构很简单，可以避免过度的prop传递，或者基于React本身提供的特性，你的状态已经足够可控了，此时你完全可以不使用状态管理。
#### React Hooks和Redux解决的问题不一样
1. React Hooks被开发出来的理由
   1. 难以复用类组件之间的逻辑
   2. 生命周期中经常包含一些不相关代码
   3. 类组件难以被机器和人理解
2. React Hooks确实提供了一些选择去管理应用状态：useState, useReducer, useContext
#### React Hooks并没有让你的应用实现以前实现不了事情
1. 你可以使用函数组件来做以前类组件做的事情，但除了更好的组织复用diamante的能力，函数组件并不能做类组件完成不了的特性。
#### React-Redux也有自己的hooks
#### 没有必要比较React Hooks和Redux孰优孰劣
1. 这两项技术可以很好的互补，React Hooks不会替代Redux，他们提供更友好的方式来组织你的react应用。


2019.10.16