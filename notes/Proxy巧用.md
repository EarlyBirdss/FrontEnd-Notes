#### Proxy 介绍
* 代理器
```
// target是表示所要拦截的对象，handle是用来定制拦截行为的对象
var proxy = new Proxy(target, handler);
```

```
handler.get
handler.set
handler.has
handler.apply
handler.construct
handler.ownKeys
handler.deleteProperty
handler.defineProperty
handler.isExtensible
handler.preventExtensions
handler.getPrototypeOf
handler.setPrototypeOf
handler.getOwnPropertyDescriptor
```

#### 用处1：默认值/“零值”
* 零值是特定于类型的隐式默认结构值。其思想是提供类型安全的默认基元值
```
const withZeroValue = (target, zeroValue) => new Proxy(target, {
  get: (obj, prop) => (prop in obj) ? obj[prop] : zeroValue
})
// 如果设置了属性，则返回属性值。 否则，它返回一个默认的“零值”
```

#### 用处2：负索引数组
```
// [-1]访问最后一个元素，[-2]访问倒数第二个元素，以此类推
const negativeArray = (els) => new Proxy(els, {
  get: (target, propKey, receiver) => Reflect.get(target,
    (+propKey < 0) ? String(target.length + +propKey) : propKey, receiver)
});
```

#### 用处3：隐藏属性
```
const hide = (target, prefix = '_') => new Proxy(target, {
  has: (obj, prop) => (!prop.startsWith(prefix) && prop in obj),
  ownKeys: (obj) => Reflect.ownKeys(obj)
    .filter(prop => (typeof prop !== "string" || !prop.startsWith(prefix))),
  get: (obj, prop, rec) => (prop in rec) ? obj[prop] : undefined
})

// 验证
let userData = hide({
  firstName: 'Tom',
  mediumHandle: '@tbarrasso',
  _favoriteRapper: 'Drake'
})

userData._favoriteRapper        // undefined
('_favoriteRapper' in userData) // false
```

#### 用处4：缓存
* 根据需要将对象包装为无效（和重新同步）属性。 所有访问属性的尝试都首先检查缓存策略，该策略决定返回当前在内存中的内容还是采取其他一些操作。
```
const ephemeral = (target, ttl = 60) => {
  const CREATED_AT = Date.now()
  const isExpired = () => (Date.now() - CREATED_AT) > (ttl * 1000)

  return new Proxy(target, {
    get: (obj, prop) => isExpired() ? undefined : Reflect.get(obj, prop)
  })
}
```

#### 用处5：只读视图
```
const NOPE = () => {
  throw new Error("Can't modify read-only view");
}

const NOPE_HANDLER = {
  set: NOPE,
  defineProperty: NOPE,
  deleteProperty: NOPE,
  preventExtensions: NOPE,
  setPrototypeOf: NOPE
}

const readOnlyView = target =>
  new Proxy(target, NOPE_HANDLER)
```

#### 用处6：枚举视图
```
const createEnum = (target) => readOnlyView(new Proxy(target, {
  get: (obj, prop) => {
    if (prop in obj) {
      return Reflect.get(obj, prop)
    }
    throw new ReferenceError(`Unknown prop "${prop}"`)
  }
}))
```

#### 用处7：运算符重载
```
const range = (min, max) => new Proxy(Object.create(null), {
  has: (_, prop) => (+prop >= min && +prop <= max)
}
```

#### 用处8：cookie对象
```
const getCookieObject = () => {
    const cookies = document.cookie.split(';').reduce((cks, ck) =>
	({[ck.substr(0, ck.indexOf('=')).trim()]: ck.substr(ck.indexOf('=') + 1), ...cks}), {});
    const setCookie = (name, val) => document.cookie = `${name}=${val}`;
    const deleteCookie = (name) => document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

    return new Proxy(cookies, {
	set: (obj, prop, val) => (setCookie(prop, val), Reflect.set(obj, prop, val)),
        deleteProperty: (obj, prop) => (deleteCookie(prop), Reflect.deleteProperty(obj, prop))
     })
}
```

[原文链接](https://github.com/qq449245884/xiaozhi/issues/78)

2019.12.31