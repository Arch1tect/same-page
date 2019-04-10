import "./Body.css"

import React, { Component } from "react"

class App extends Component {
  render() {
    return <div className="sp-message-body">{this.props.text}</div>
  }
}

export default App
