import React, { Component } from "react"

import ChatHeader from "./ChatHeader"
import ChatBody from "./ChatBody"
import ChatBottom from "./ChatBottom"

import socket from "./socket"

class App extends Component {
  render() {
    console.log("render chat tab")
    return (
      <div>
        <ChatHeader />
        <ChatBody />
        <ChatBottom />
      </div>
    )
  }
}

export default App
