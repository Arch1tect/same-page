import './ChatBody.css'

import React, { Component } from 'react'
import ChatMessage from './ChatMessage/ChatMessage'

class App extends Component {
  render() {
    // const messages = (this.props.data||[]).map((msg) =>
    //   <ChatMessage data={msg}/>
    // )
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
