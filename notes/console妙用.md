#### console.table
1. 输出数组型时，可以使用console.table可以是数据视图更清晰（前提是内部字段没有特别多……）
2. 第二个参数是可选展示的列数据
```
console.table(data, ["id", "price"]);
```

#### console.assert
1. 只有表达式为**false**时，才输出相应的信息到控制台
```
console.assert(tx.buyer !== 'WAL0412', tx);
```

#### console.count
1. 统计代码被执行的次数
```
for(let i = 0; i < 10000; i++) {
  if(i % 2) {
    console.count('odds');
  }
  if(!(i % 5)) {
    console.count('multiplesOfFive');
  }
  if(isPrime(i)) {
    console.count('prime');
  }
}

// 执行结果
odds: 1
odds: 2
prime: 1
odds: 3
multiplesOfFive: 1
prime: 2
odds: 4
prime: 3
odds: 5
multiplesOfFive: 2
...
```

#### console.trace
1. 跟踪调用栈
```
export default class CupcakeService {

  constructor(dataLib) {
    this.dataLib = dataLib;
    if(typeof dataLib !== 'object') {
      console.log(dataLib);
      console.trace();
    }
  }
  ...
}
```

#### console.time
1. 跟踪操作时间的专用函数
```
const slowFunction = number =>  {
  console.time('slowFunction');
  // something slow or complex with the numbers.
  // Factorials, or whatever.
  console.timeEnd('slowFunction');
}
console.time();

for (i = 0; i < 100000; ++i) {
  slowFunction(i);
}
console.timeEnd();
```

#### console.dir
1. 更方便的查看dom

#### console.group 没啥用
```
// this is the global scope
let number = 1;
console.group('OutsideLoop');
console.log(number);
console.group('Loop');
for (let i = 0; i < 5; i++) {
  number = i + number;
  console.log(number);
}
console.groupEnd();
console.log(number);
console.groupEnd();
console.log('All done now');
```

#### console.warn
1. 警告

#### console.log
1. css占位符 %c
```
console.log('I am a %cbutton', 'color: white; background-color: orange; padding: 2px 5px; border-radius: 2px');
```

#### document.body.contentEditable=true
1. 将浏览器转换为编辑器，可以在 DOM 中的任何位置添加文本和从中删除文本

#### getEventListeners($(‘selector’))
1. 查找与DOM中的元素关联的事件

[原文链接](https://github.com/qq449245884/xiaozhi/issues/45)