#### 删除数组重复项
new Set()

#### 替换数组中的特定值
array.splice(start, /valuetodelete/, /valuetoadd/)

#### Array.form达到Array.map效果
Array.from(arr, arr => arr.field);

#### 数组置空
array.length = 0

#### 数据转为对象
{...array}

#### 填充数组
new Array(10).fill('somevalue');

#### 数据合并
[...array1, ...array2, ...array3]

#### 求交
[...new Set(array1)].filter(item => array2.includes(item));

#### 删除虚值(false, 0, '', null, NaN, undefined)
array.filter(Boolean);

#### 从数组中获取随机值
array[(Math.floor(Math.random() * (array.length)))] // ???Math.random取不到1

#### 反转数组
array.reverse()

#### 获取传入参数值的最后一个index位置
array.lastIndexOf()

#### 对函数中所有值求和
array.reduce((x, y) => x + y); // 万能函数reduce

[原文链接](https://github.com/qq449245884/xiaozhi/issues/133)

2019.11.15