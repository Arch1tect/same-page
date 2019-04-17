import React from "react"
import Message from "./Message"
import socket from "./socket"
import urls from "config/urls"
const chatBodyStyle = {
  height: "calc(100% - 107px)",
  overflow: "auto",
  width: "100%",
  position: "fixed",
  background: "#eceff1",
  padding: 10,
  paddingBottom: 50
}
const AUTO_SCROLL_TRESHOLD_DISTANCE = 100
class ChatBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = { messages: props.data || [] }
    this.bodyRef = React.createRef()
    // window.addLiveMsgToChatBody only for debug
    window.addLiveMsgToChatBody = this.addMsg
  }
  componentDidMount() {
    console.log("register new message events")
    socket.on("new message", data => {
      console.log(data)
      data.text = data.message
      // TODO: user int id not uuid?
      data.userId = data.sender
      if (data.hasAvatar) {
        data.avatarSrc = urls.cloudFront + data.userId + ".jpg"
      }
      if (data.userId == "xyz") {
        data.self = true
      }
      this.setState((state, props) => ({
        messages: [...state.messages, data]
      }))
      this.scrollToBottomIfNearBottom()
    })
  }
  scrollToBottomIfNearBottom = () => {
    const bodyDiv = this.bodyRef.current
    if (
      bodyDiv.scrollHeight - bodyDiv.scrollTop - bodyDiv.offsetHeight <
      AUTO_SCROLL_TRESHOLD_DISTANCE
    ) {
      setTimeout(() => {
        bodyDiv.scrollTop = bodyDiv.scrollHeight
      }, 100)
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
        <Message key={index++} data={msg} mergeAbove={mergeAbove} />
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

export default ChatBody
