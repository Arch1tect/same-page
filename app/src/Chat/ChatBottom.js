import './ChatBottom.css'
import React, { Component } from 'react'
import { Input, Icon } from 'antd'


class App extends Component {
  render() {
    return (
      <div className="sp-chat-bottom">
        <Input addonBefore={<Icon type="smile" />} addonAfter={<Icon type="paper-clip" />} placeholder="请输入。。。" />
      </div>
    )
  }
}

export default App
