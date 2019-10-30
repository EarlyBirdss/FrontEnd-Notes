#### JS闭包
```
function addToArr() {
  var arr = [];

  return function push(element) {
    arr.push(element);
    console.log(arr);
  };

  //return element + " added to " + arr;
}

var result = addToArr();
result("a"); // [ 'a' ]
result("b"); // [ 'a', 'b' ]
```

1. 提供私有的全局变量
2. 在函数调用之间保存变量(状态)

#### 模块模式
1. ES5封装私有变量
2. 另一个函数返回一个函数时，会创建一个闭包，这个模式也称为**“工厂函数**”   
```
var Person = (function() {
  var person = {
    name: "",
    age: 0
  };

  function setName(personName) {
    person.name = personName;
  }

  function setAge(personAge) {
    person.age = personAge;
  }

  function getPerson() {
    return person.name + " " + person.age;
  }

  return {
    setName: setName,
    setAge: setAge,
    getPerson: getPerson
  };
})();

Person.setName("Tom");
Person.setAge(44);
var person = Person.getPerson();
console.log(person); // Tom 44
```

#### 思考
1. 什么是闭包？
2. 使用全局变量有哪些不好的方面？
3. 什么是 JS 模块，为什么要使用它？

[原文链接](https://github.com/qq449245884/xiaozhi/issues/127)

2019.10.30
