import './ChatBody.css'

import React, { Component } from 'react'
import ChatMessage from './ChatMessage'

class App extends Component {
  render() {
    let messages = []
    let lastMsg = null;
    const data = this.props.data || [];
    data.forEach(msg => {
      if (lastMsg && lastMsg.userId == msg.userId) {
        msg.mergeAbove = true
      }
      messages.push(<ChatMessage data={msg}/>)
      lastMsg = msg;
    });
    return (
      <div className='sp-chat-body'>
        {messages}
      </div>
    );
  }
}

export default App;
