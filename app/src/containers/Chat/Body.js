import React from "react"
import Message from "./Message"
import { socketHandler } from "socket/socket"
import AccountContext from "context/account-context"
const chatBodyStyle = {
  height: "calc(100% - 107px)",
  overflow: "auto",
  width: "100%",
  position: "fixed",
  background: "#f6f9fc",
  padding: 10,
  paddingBottom: 50
}
const AUTO_SCROLL_TRESHOLD_DISTANCE = 200
class ChatBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = { messages: props.data || [] }
    this.bodyRef = React.createRef()
    // window.addLiveMsgToChatBody only for debug
    window.addLiveMsgToChatBody = this.addMsg
  }

  componentDidMount() {
    console.log("register new message handler")
    socketHandler.onLiveMsg = data => {
      this.setState((state, props) => ({
        messages: [...state.messages, data]
      }))
      let timeout = 10
      if (data.type === "sticker") timeout = 500
      this.scrollToBottomIfNearBottom(timeout)
    }
  }
  scrollToBottomIfNearBottom = timeout => {
    timeout = timeout || 100
    const bodyDiv = this.bodyRef.current
    if (
      bodyDiv.scrollHeight - bodyDiv.scrollTop - bodyDiv.offsetHeight <
      AUTO_SCROLL_TRESHOLD_DISTANCE
    ) {
      setTimeout(() => {
        bodyDiv.scrollTop = bodyDiv.scrollHeight
      }, timeout)
    }
  }
  addMsg = msg => {
    this.setState((state, props) => ({
      messages: [...state.messages, msg]
    }))
  }

  render() {
    let messages = []
    let lastMsg = null
    let index = 0
    const data = this.state.messages

    // note: do not modify msg since it's state data
    data.forEach(msg => {
      let mergeAbove = false
      if (lastMsg && lastMsg.userId === msg.userId) {
        mergeAbove = true
      }
      messages.push(
        <Message
          withHoverCard={true}
          key={index++}
          data={msg}
          mergeAbove={mergeAbove}
        />
      )
      lastMsg = msg
    })
    return (
      <div ref={this.bodyRef} style={chatBodyStyle}>
        {messages}
      </div>
    )
  }
}
ChatBody.contextType = AccountContext

export default ChatBody
