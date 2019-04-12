import React from "react"
import Message from "./Message"

const chatBodyStyle = {
  height: "calc(100% - 107px)",
  overflow: "auto",
  width: "100%",
  position: "fixed",
  background: "#eceff1",
  padding: 10,
  paddingBottom: 50
}
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
    return <div style={chatBodyStyle}>{messages}</div>
  }
}

export default ChatBody
