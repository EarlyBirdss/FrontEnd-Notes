#### 不好的例子
```
class SomeComponent extends React.PureComponent {
  get instructions () {
    if (this.props.do) {
      return 'click the button: '
    }
    return 'Do NOT click the button: '
  }

  render() {
    return (
      <div>
        {this.instructions}
        // 每次组件重新渲染时，都会重新生成新的事件函数
        <Button onClick={() => alert('!')} />
      </div>
    )
  }
}
```

#### 修复
```
// 在组件外部定义事件函数
const createAlertBox = () => alert('!');

class SomeComponent extends React.PureComponent {

  get instructions() {
    if (this.props.do) {
      return 'Click the button: ';
    }
    return 'Do NOT click the button: ';
  }

  render() {
    return (
      <div>
        {this.instructions}
        <Button onClick={createAlertBox} />
      </div>
    );
  }
}
```
如果函数确实依赖于组件，以至于无法在组件外部定义它，你可以将组件的方法作为事件处理传递过去
```
class SomeComponent extends React.PureComponent {

  createAlertBox = () => {
    alert(this.props.message);
  };

  get instructions() {
    if (this.props.do) {
      return 'Click the button: ';
    }
    return 'Do NOT click the button: ';
  }

  render() {
    return (
      <div>
        {this.instructions}
        <Button onClick={this.createAlertBox} />
      </div>
    );
  }
}
```

#### 高级修复
```
// 例：在遍历数组的时候，有很多独立的动态事件监听器
class SomeComponent extends React.PureComponent {
  // SomeComponent的每个实例都有一个单击处理程序缓存，这些处理程序是惟一的。

  clickHandlers = {};

  // 在给定唯一标识符的情况下生成或返回单击处理程序。
  getClickHandler(key) {
    // 如果不存在此唯一标识符的单击处理程序，则创建
    if (!Object.prototype.hasOwnProperty.call(this.clickHandlers, key)) {
      this.clickHandlers[key] = () => alert(key);
    }
    return this.clickHandlers[key];
  }
  render() {
    return (
      <ul>
        {this.props.list.map(listItem =>
          <li key={listItem.text}>
            <Button onClick={this.getClickHandler(listItem.text)} />
          </li>
        )}
      </ul>
    );
  }
}
```

[原文链接](https://github.com/qq449245884/xiaozhi/issues/27)

2019.11.18