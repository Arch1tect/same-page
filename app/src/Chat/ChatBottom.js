import React, { Component } from 'react'
import { Input, Icon } from 'antd'
import './ChatBottom.css'


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
