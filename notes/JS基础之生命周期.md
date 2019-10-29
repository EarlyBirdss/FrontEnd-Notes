#### 一切皆是对象
1. 每个对象都有一个__proto__的内部属性，函数有protype的外部属性。由于prototype仍是个对象，故protype也拥有__proto__属性
1. Object.create(proto, [propertiesObject]):创建一个新对象，使用现有的对象来提供新创建的对象的proto
2. 构造函数 new
   1. 创建一个空对象
   2. 将空对象的__proto__指向构造函数的prototype
   3. 使用空对象作为上下文的调用构造函数
3. 检查原型链
   1. Object.hasPrototype
   2. Object.isPrototype 测试一个对象是否存在于另一个对象的原型链上
4. 保护对象不收操纵
   1. Object.preventExtensions()方法让一个对象变的不可扩展
   2. Object.isExtensible 检查对象是否可扩展
   3. Object.defineProperties 将每个属性定义为是否可写和是否可配置等
   4. Object.freeze 所有对象的属性不可写且不可配置，但只能作用于第一层，无法操作嵌套对象

#### 思考
1. 如何创建不可变的 JS 对象？
2. 什么是构造函数调用？
3. 什么是构造函数？
4. “prototype” 是什么？
5. 可以描述一下 new 在底层下做了哪些事吗？

[原文链接](https://github.com/qq449245884/xiaozhi/issues/126)

2019.10.29