import "./Body.css"

import React from "react"
import Message from "./Message"

// todo: ensure appending new msg doesn't cause
// render of existing items in list!!!

class ChatBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = { messages: props.data || [] }
    window.addLiveMsgToChatBody = this.addMsg
  }

  addMsg = msg => {
    this.setState((state, props) => ({
      messages: [...state.messages, msg]
    }))
  }

  render() {
    console.log("render chat body")
    let messages = []
    let lastMsg = null
    let index = 0
    const data = this.state.messages
    console.log(data)

    // note: do not modify msg since it's state data
    data.forEach(msg => {
      let mergeAbove = false
      if (lastMsg && lastMsg.userId === msg.userId) {
        mergeAbove = true
      }
      messages.push(
        <Message key={index++} data={msg} mergeAbove={mergeAbove} />
      )
      lastMsg = msg
    })
    return <div className="sp-chat-body">{messages}</div>
  }
}

export default ChatBody
