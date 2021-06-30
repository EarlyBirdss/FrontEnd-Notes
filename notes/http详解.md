### http 协议

##### 5层结构（从下至上）
* 物理层
* 数据链路层（网卡、交换机）
* 网络层（IP）（路由器）
* 传输层（TCP协议、UDP）（进程、端口）
* 应用层（http\https\ftp协议）（应用程序）

##### TCP协议三次握手、四次挥手
三次握手
* 客户端发送SYN报文
* 服务器回复SYN报文+ACK
* 客服端再发送ACK + 1

四次挥手
* 客户端发送FIN
* 服务器回复ACK(此时服务器可能还有报文未发送完)
* 服务端发送FIN+ACK(此时服务器报文已发送完全)
* 客户端回复ACK(此时客户端并没有关闭连接，要等2个最长等待时间后仍没有接受到报文后才自动关闭)

为什么握手需要3次，挥手却需要4次？
答：当服务端接受到客户端的关闭请求后，可能并没有发送完报文，只能通过回复ACK表示我已经收到你的关闭请求了，但我需要发送完毕报文后只能响应关闭。
为什么客户端需要等待2MSL(最大报文段生存时间)才能关闭？
答：因为网络不是可靠的，服务端可能没有到ACK回复，会重复发送FIN确认。客服端为了确保服务端收到了ACK，必须等待2MSL（一个发送+一个回复）。
为什么不能2次握手
答：解决网络中存在延迟的重复分组。在只有2次握手的情况下，假设，客户端发送的第一个连接请求报文在某一个节点延误了但没有丢失，在连接已经关闭之后到达。这本来是一个失效的报文段，但服务端收到报文后，回复ACK并等待客服端发来数据，但客服端因为没有发送请求报文因此也不会发送。此时服务端的资源就被白白浪费了。

##### TCP和UDP
* TCP提供可靠的链接
* UDP提供更快的但不可靠的链接，多用于音、视频

##### IP v4、IP v6
* IP v4: 32字节
* IP v6: 128字节

##### https
* https: http + 安全协议（SSL证书/TLS）
* 默认443端口
* 工作流程：
  * TCP三次握手
  * 客服端验证证书
  * DH算法协商对称加密算法的秘钥、hash算法的秘钥
  * SSL加密隧道协商完成
  * 数据以加密算法传输保证数据的私密性、hash加密保证数据的完整性不被篡改
* 加密流程：
  * 客户端发送请求 -> 服务端返回证书公钥 -> 客户端验证证书是否有效 -> 客户端生成一个随机值 -> 客户端发送用公钥加密的随机值 -> 服务端使用私钥解密得到随机值（密钥） -> 服务端发送用随机值（密钥）加密的内容 -> 客户端用随机值（密钥）解密

##### http2
* 头部压缩
* 二进制分帧
* 链路复用： 原来的链路序列和阻塞就不存在了，所有的请求都是通过一个tcp连接并发完成的
* 服务器推：可以主动推送HTML中要请求的资源。存在的问题：无视浏览器缓存

##### socket
* open—write/read—close模式

##### http header
* accept
* connection
* referer
* host
* user-agent
* cookie
* cache-control
* 等

##### http header content-type
* content-type: 表示客户端发送什么类型的数据
* accept: 表示服务端希望接受什么样的数据
* content-type常见的的几个取值
  * text/plain 纯文本
  * application/x-www-form-urlencoded 表单类型
  * application/json json格式
  * multipart/form-data 文件传输时

##### http状态码
* 2XX 请求成功
* 3XX 重定向
* 4XX 客户端错误
* 5XX 服务端错误
* 常见的状态码
  * 301 永久重定向
  * 302 临时重定向
  * 304 未修改
  * 400 客户端发送语法错误
  * 405 客服端请求的方法被禁止
  * 500 服务内部错误
  * 501 不支持请求的功能
  * 502 网关错误
  * 503 过载

##### http method
* get
* post
* options: 1. 检查服务端性能 2. 查看服务端支持的请求方法
* head
* put: 更新
* patch: put的补充，局部更新
* delete
* track: （环回诊断）回显服务器收到的请求，用于诊断

##### cookie
* http是无状态
* 每次客户端发送请求都会带上cookie，cookie的来源可以是服务端设置也可以是客户端设置
* 有大小限制，一般不超过4k，一般最多20个
* 纯文本格式
* 属性
  * name=value
  * domain
  * expires
  * path
  * secure: 如果设置，只有在ssh链接时才回传
* cookie和session
  * cookie用于b/s链接链路
  * session用于服务端，需要cookie才能生效
* cookie和localstorage
  * cookie用于b/s链接链路，容量较少
  * localstorage只存于客户端，容量更大，有get\set方法可以调用

##### ajax
```
const xhr = new XMLHttpRequest();
xhr.open('post', '/xxx.json');
xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
xhr.send('somedata=somedata');
xhr.onreadystatechange = () => {
  if (xhr.readyState && xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  }
}
```
##### fetch
```
fetch('/xxx.json', {
    // some options
    method: 'POST',
    body: JSON.stringify({ value: 1 }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(error => consoel.log(error));
```

* response实现了body，可以调用 Body.arrayBuffer()\blob()\formData()\json()\text()
* response示例可以访问status(状态码),statusText(状态码对应的文本描述),ok(boolean值，是否在200-299之间)
* fetch返回一个promise，并且不会被reject，即使返回的状态500或404
* fetch不发送cookie

2021.06.30