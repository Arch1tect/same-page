import './ChatMessage.css'

import React, { Component } from 'react'
import { Avatar, Radio } from 'antd'

import MessageBody from './MessageBody'

/*
props includes:
  avatarSrc
  username
  text
  type: text/emoji/img
  self

*/
class App extends Component {
  render() {
    const data = this.props.data;
    let avatar = <Avatar size="small" icon="user" />
    if (data.avatarSrc) {
      avatar = <Avatar src={data.avatarSrc} />
    }
    let messageHeader = (
      <div style={{marginTop: 10}}>
        {avatar}
        <span className='sp-chat-username'>{data.username}</span>
      </div>
    )
    if (data.self) {
      messageHeader = (
        <div style={{marginTop: 10}}>
          <span className='sp-chat-username'>{data.username}</span>
          {avatar}
        </div>
      )
    }
    if (data.mergeAbove) {
      messageHeader = (<span></span>)
    }
    
    return (
      <div className={data.self ? 'self' : 'other'}>
        {messageHeader}
        <MessageBody type={data.type} text={data.text}/>
      </div>
    );
  }
}

export default App;
