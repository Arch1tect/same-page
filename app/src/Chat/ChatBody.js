import './ChatBody.css'

import React, { Component } from 'react'
import ChatMessage from './ChatMessage/ChatMessage'

class App extends Component {
  render() {
    return (
      <div className='sp-chat-body'>
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
      </div>
    );
  }
}

export default App;
