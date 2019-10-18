#### 现代 JavaScript 教程 - 类型检测："instanceof"
1. instanceof用于检测对象是否属于某个class，用法：obj instanceof Class
2. instanceof在检测中会将原型链考虑在内，可以用静态方法Symbol.hasInstane来改善检测效果。
   ```
   class Animal {
       static [Symbol.hasInstance](obj) {
           if (obj.name) return true;
       }
   }
   let dog = { name: 'Lunck' };
   dog instanceof Animal; // true
   ```
3. instanceof 执行过程
   1. 如果有静态方法Symbol.hasInstance，直接使用该方法进行检测
   2. 大部分类是没有这个方法的，这时检查Class.proptotype是否与obj的原型链中的任意一个原型相等。即向上查找，直到prototy为null。
4. 类型检查
   1. typeof 基本数据类型
   2. Object.proptype.toString.call() 基本数据类型、内置对象以及包含Symbol.toStringTag属性的对象
      1. toString内部算法会检查this对象
      2. Symbol.toStringTag:自定义输出
            ```
            let use = {
                [Symbol.toStringTab]: 'User'
            };
            {}.toString.call(user); // [object User]
            ```

            ```
            // 环境相关对象和类的toStringTag
            window[Symbol.toStringTag]; // window
            XMLHttpRequest.proptotype[Symbol.toStringTag]; //XMLHttpRequest
            ```
   3. instanceof 任意对象

[原文地址](https://mp.weixin.qq.com/s/nmj9dQWRyaEURpearFHULA)

#### 补充
##### 前端工程师的产品思维
1. 面向需求编程而不是面向接口编程
   1. 理解与实例
      1. 对中台前端来说：如果一个后端告诉你，我需要你帮我写一个功能，在某页面上显示一个提示信息，告诉用户不要轻易改动。
      2. 以产品思维思考：设计前端所有页面和操作的权限，没有权限的人不给入口，能操作的人再在操作过程中给予提醒的弹窗。
2. 一个表单里面如果出现了需要额外输入的东西，比如上文的添加用户和这里的添加物品，那么就把他们挪到别处去吧！PC 端可以用弹窗，可以用侧滑抽屉；移动端则可以 Push 一个新页面。
3. 让表单页面放眼望去都是表单元素（最好长得都是像输入框的元素），且每个表单元素上展示的都是确定要提交的表单数据。

[原文地址](https://mp.weixin.qq.com/s/XD07GPyMXDXNqdHu--3hAA)