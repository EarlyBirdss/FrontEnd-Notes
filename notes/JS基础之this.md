#### 规则1： 全局‘this’默认绑定window
1. 默认绑定: 全局this，指向window
2. 当一个函数在全局环境中被调用时，该函数会将它的this指向全局对象
3. 当引擎无法找出this是什么时，它会返回到全局对象
4. 严格模式下，可以清除默认绑定，避免意想不到的后果

#### 规则2：隐式绑定
1. 当函数被赋值给对象时，即该数组是函数运行时的宿主对象
```
var widget = {
  items: ["a", "b", "c"],
  printItems: function() {
    console.log(this.items);
  }
};
```

#### 规则3：显式绑定 bind, apply, call
1. 使用bind绑定
```
// 对原始函数的 this 永久重新绑定
var obj = {
  version: "0.0.1",
  printParams: function(param1, param2, param3) {
    console.log(this.version, param1, param2, param3);
  }
};

var newObj = {
  version: "0.0.2"
};

obj.printParams = obj.printParams.bind(newObj);

obj.printParams("aa", "bb", "cc");
```
2. 赋值操作会丢失绑定
```
// 丢失绑定
const handleClick = this.handleClick;

element.addEventListener("click", function() {
  handleClick();
});
```

#### 规则4：new绑定
1. 在构造函数上使用new时，this 总是指向新创建的对象
```
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  console.log("Hello " + this.name);
};

var me = new Person("Valentino");
me.greet();

// Output: "Hello Valentino"
```

#### 箭头函数 & this
```
// 严格模式，禁止默认绑定(回到全局this)
"use strict";

function Post(id) {
  this.data = [];

  fetch("https://jsonplaceholder.typicode.com/posts/" + id)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.data = json; // "TypeError: Cannot set property 'data' of undefined at :11:17"
    });
}

var post1 = new Post(3);
```
```
// 使用箭头符号简单解决上述错误，原因：箭头函数将this指向其封闭的环境(也称“词法作用域”)，(即箭头函数不改变this也没有自己的this)
"use strict";

function Post(id) {
  this.data = [];

  fetch("https://jsonplaceholder.typicode.com/posts/" + id)
    .then(response => {
      return response.json();
    })
    .then(json => {
      this.data = json;
    });
}

var post1 = new Post(3);
```

[原文链接](https://github.com/qq449245884/xiaozhi/issues/131)

2019.11.01