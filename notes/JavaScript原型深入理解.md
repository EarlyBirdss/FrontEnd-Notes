#### 创建对象
##### 最初我们直接使用{}创建对象
```
let animal = {}
animal.name = 'Leo'
animal.energy = 10

animal.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

animal.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

animal.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}
```

##### 1. 函数实例化
优化第一步：以上功能是独立的，用function包起来
```
function Animal (name, energy) {
  let animal = {}
  animal.name = name
  animal.energy = energy

  animal.eat = function (amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }

  animal.sleep = function (length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  }

  animal.play = function (length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }

  return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)
```

##### 2. 函数实例化和共享方法
优化第二步：以上1.中每次调用Animal都会重新重新创建eat, sleep, play方法，故应该将三个方法提出来放在外部，内部只访问变量。
```
const animalMethods = {
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  },
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  },
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
}

function Animal (name, energy) {
  let animal = {}
  animal.name = name
  animal.energy = energy
  animal.eat = animalMethods.eat
  animal.sleep = animalMethods.sleep
  animal.play = animalMethods.play

  return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)
```

##### 3. Object.create()
优化第三步：Object.create可以创建一个对象，只要这个对象上的属性查找失败，它可以查询另一个对象（传入的参数）看另一个对象是否具有该属性。
```
const animalMethods = {
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  },
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  },
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
}

function Animal (name, energy) {
  let animal = Object.create(animalMethods)
  animal.name = name
  animal.energy = energy

  animal.eat = function(length) {
    console.log('I am eating')
    this.energy += length
  }

  return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)

leo.eat(10) // I am eating
snoop.play(5) // ${this.name} is playing
```

##### 4. 原型（prototype）实例化
优化第四步：animalMethods与Animal方法完全分离且看不出联系，使用proptype将Animal的方法放入Animal的原型链属性中
```
function Animal (name, energy) {
  let animal = Object.create(Animal.prototype)
  animal.name = name
  animal.energy = energy

  return animal
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)

leo.eat(10)
snoop.play(5)
```
##### 5. 伪类实例化
优化第五步：由1，2，3,4步，我们知道了（1）如何创建构造函数，（2）如何向构造函数的原型添加方法，（3）如何使用Object.create将失败的查找委托给函数的原型。在Animal对象中，我们做了三件事：（1）创建一个对象，并把该对象在原型上的方法赋值给该对象，（2）添加该对象的属性或方法，（3）返回该对象。这正是new关键字做的事情，使用new优化
```
function Animal (name, energy) {
  // const this = Object.create(Animal.prototype)
  this.name = name
  this.energy = energy
  // return this
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)
```

##### 6. ES6 语法糖class
优化第六步：通过function+this+proptotype+new的形式创建对象，总之有点复杂，直接使用class语法糖简单清晰
```
class Animal {
  constructor(name, energy) {
    this.name = name
    this.energy = energy
  }
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  }
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)
```
##### 7. 静态属性
如果你不想该方法被实例共享，使用静态方法或静态属性，关键字 static
```
class Animal {
  constructor(name, energy) {
    this.name = name
    this.energy = energy
  }
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  }
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
  static nextToEat(animals) {
    const sortedByLeastEnergy = animals.sort((a,b) => {
      return a.energy - b.energy
    })

    return sortedByLeastEnergy[0].name
  }
}
```


##### 其他

##### 获取对象的原型
1. Object.getPrototypeOf
2. Object.getPrototypeOf(leo) === Animal.prototype

##### 判断原型上是否包含某个属性
1. hasOwnProperty
2. 当使用for in循环实例时，对象和方法都会进入，如果我们只枚举对象，是否leo.hasOwnPropperty(key)

##### 检测对象是否是类的实例
1. object instance class
2. instanceof的工作方式是检测原型链中是否存在constructor.prototype，逐层向上检测
   
##### Object.create原理
```
function Mycreate(obj) {
  function Fn();
  Fn.proptotype = obj;
  return new Fn();
}
```

##### 箭头函数
1. 箭头函数没有原型属性

[原文地址](https://github.com/qq449245884/xiaozhi/issues/60)

2019.10.22
