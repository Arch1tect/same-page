import React, { Component } from "react"

import Header from "./Header"
import Body from "./Body"
import Footer from "./Footer"

import socket from "./socket"

function Chat(props) {
  return (
    <div>
      <Header />
      <Body />
      <Footer />
    </div>
  )
}

export default Chat
