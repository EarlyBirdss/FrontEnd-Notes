#### 文档对象模型（DOM）
1. 当访问一个WEB页面时，浏览器解析每一个HTML元素，在内存中保存HTML的虚拟表示
2. 每个HTML元素都是ELEMENT派生来的，可以通过检测原型，查明该元素的类型
   ```
   document.quertSelector('h1').__proto__  // HTMLHeadingElement
   ```

#### 节点，元素和DOM操作
```
document.querySelector('h1');
```
```
// 返回单个元素
document.getElementById('testimonials');

// 返回一个 HTMLCollection
document.getElementsByTagName('p');

// 返回一个节点列表
document.querySelectorAll('p');
```
```
// Read or write
document.querySelector('h1').innerHtml; // Read
document.querySelector('h1').innerHtml = ''; // Write! Ouch!
```
```
// 检查节点类型
document.querySelector('h1').nodeType; // 1
```
```
// 检查节点名
document.querySelector('h1').nodeName; // 'H1'
```
```
// 创建 Element 类型的新节点
var heading = document.createElement('h1');
```
```
// 从 DOM 中删除节点
document.querySelector('h1').remove();
```
```
// 任何 HTML 元素都具有与 EventTarget 相同的特性:发布事件的能力
document.querySelector('p') instanceof EventTarget // true
```
```
var thead = table.createTHead();
```

最常处理的四种节点类型：
1. document: 根节点(nodeType 9)
2. 类型为Element的节点：实际的HTML标签（nodeType 1）,例如p和div
3. 类型属性的节点：每个HTML元素的属性（属性）
4. Text 类型的节点:元素的实际文本内容(nodeType 3)


[原文链接](https://github.com/qq449245884/xiaozhi/issues/130)

2019.11.04