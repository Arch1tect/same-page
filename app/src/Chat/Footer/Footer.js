import "./Footer.css"

import React, { Component } from "react"
import { Input, Icon } from "antd"

const MESSAGE_TIME_GAP = 2 * 1000
let lastMsgTime = 0

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ""
    }
  }

  handleKeyDown = e => {
    if (e.key === "Enter") {
      const now = new Date()
      if (now - lastMsgTime > MESSAGE_TIME_GAP) {
        let msg = {
          text: this.state.input,
          username: "David",
          self: true
        }
        window.addLiveMsgToChatBody(msg)
        this.setState({ input: "" })
        lastMsgTime = now
      } else {
        console.error("too fast")
      }
    }
  }

  handleChange = e => {
    this.setState({ input: e.target.value })
  }

  render() {
    return (
      <div className="sp-chat-bottom">
        <Input
          onKeyDown={this.handleKeyDown}
          value={this.state.input}
          addonBefore={<Icon type="smile" />}
          addonAfter={<Icon type="paper-clip" />}
          onChange={this.handleChange}
          placeholder="请输入。。。"
        />
      </div>
    )
  }
}

export default App
