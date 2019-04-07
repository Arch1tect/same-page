import React, { Component } from 'react'

import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'
import ChatBottom from './ChatBottom'

class App extends Component {
  render() {
    return (
      <div>
        <ChatHeader/>
        <ChatBody/>
        <ChatBottom/>
      </div>
    );
  }
}

export default App;
