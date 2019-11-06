#### XMLHttpRequest
1. JS 本身没有内置的异步性，是“宿主”环境(浏览器或 Node.js)提供处理了异步代码，如setTimeout，setInterval，XMLHttpRequest等
2. 代码示例
  ```
  "use strict";

  const request = new XMLHttpRequest();

  request.onload = callback;

  function callback() {
    const response = JSON.parse(this.response);
    console.log(response);
  }

  request.open("GET", "https://academy.valentinog.com/api/link/");
  request.send();
  ```
3. JS 私有类字段，还没有形成标准，但大多数浏览器已经支持了，用‘#’表示
```
"use strict";

class List {
  #url;
  #target;

  constructor(url, target) {
    this.#url = url;
    this.#target = target;
    this.getData();
  }

  getData() {
    const request = new XMLHttpRequest();
    request.onload = event => {
      const response = JSON.parse(event.target.response);
      this.render(response);
    };

    request.open("GET", this.#url);
    request.send();
  }

  render(data) {
    const ul = document.createElement("ul");
    for (const element of data) {
      const li = document.createElement("li");
      const title = document.createTextNode(element.title);
      li.appendChild(title);
      ul.appendChild(li);
    }
    this.#target.appendChild(ul);
  }
}

const url = "https://academy.valentinog.com/api/link/";
const target = document.body;
const list = new List(url, target);
```

#### fetch
1. fetch与新promise对象一起诞生于2015年，是原生的浏览器方法。Fetch比XMLHTTPRequest更加简洁，并且基于promise
```
fetch("https://academy.valentinog.com/api/link/")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);// response.json返回一个promise，故再用一个then处理
  });
```
2. 手动实现一个fetch
```
"use strict";

window.fetch = fetch;

function Response(response) {
  this.response = response.response;
  this.ok = response.status >= 200 && response.status < 300;
  this.statusText = response.statusText;
}

Response.prototype.json = function() {
  return JSON.parse(this.response);
};

function Request(requestInit) {
  this.method = requestInit.method || "GET";
  this.body = requestInit.body;
  this.headers = requestInit.headers;
}

function fetch(url, requestInit) {
  return new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest();
    const requestConfiguration = new Request(requestInit || {});
    request.open(requestConfiguration.method, url);
    request.onload = function() {
      const response = new Response(this);
      resolve(response);
    };
    request.onerror = function() {
      reject("Network error!");
    };
    for (const header in requestConfiguration.headers) {
      request.setRequestHeader(header, requestConfiguration.headers[header]);
    }
    requestConfiguration.body && request.send(requestConfiguration.body);
    requestConfiguration.body || request.send();
  });
}

const link = {
  title: "Building a Fetch Polyfill From Scratch",
  url: "https://www.valentinog.com/fetch-api/"
};

const requestInit = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(link)
};

fetch("https://academy.valentinog.com/api/link/create/", requestInit)
  .then(function(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then(function(json) {
    console.log(json);
  })
  .catch(function(error) {
    console.log(error);
  });
```

[原文链接](https://github.com/qq449245884/xiaozhi/issues/135)

2019.11.06