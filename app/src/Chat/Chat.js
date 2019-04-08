import React, { Component } from 'react'

import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'
import ChatBottom from './ChatBottom'

class App extends Component {
  render() {
    console.log(this.props.liveMessages)
    return (
      <div>
        <ChatHeader addLiveMsg={this.props.addLiveMsg}/>
        <ChatBody data={this.props.liveMessages}/>
        <ChatBottom/>
      </div>
    );
  }
}

export default App;
