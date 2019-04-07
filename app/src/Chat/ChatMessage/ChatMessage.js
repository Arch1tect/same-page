import './ChatMessage.css'

import React, { Component } from 'react'
import { Avatar, Radio } from 'antd'

import MessageBody from './MessageBody'


class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <span className='sp-chat-username'>David</span>
        </div>
        <MessageBody />
      </div>
    );
  }
}

export default App;
