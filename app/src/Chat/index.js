import React, { Component } from "react"

import Header from "./Header/Header"
import Body from "./Body"
import Footer from "./Footer/Footer"

import socket from "./socket"

class App extends Component {
  render() {
    console.log("render chat tab")
    return (
      <div>
        <Header />
        <Body />
        <Footer />
      </div>
    )
  }
}

export default App
