import React from "react"
import moment from "moment"

import Message from "./Message"
import { socketHandler } from "socket/socket"
import AccountContext from "context/account-context"
import { getUserFromCache } from "services/user"

const chatBodyStyle = {
  height: "calc(100% - 107px)",
  overflowY: "auto",
  overflowX: "hidden",
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
      // message event doesn't contain user data
      // but we should have it in cache when knowing
      // who are in the chatroom
      data.self = data.userId.toString() === this.context.account.id.toString()
      const user = getUserFromCache(data.userId)
      data.user = user
      window.parent.postMessage({ ...data, danmu: true }, "*")
      data.time = moment()
      this.setState((state, props) => ({
        messages: [...state.messages, data]
      }))
      let timeout = 10
      if (data.type === "sticker") timeout = 500
      this.scrollToBottomIfNearBottom(timeout)
    }
    socketHandler.onRoomChange = roomId => {
      this.setState({ messages: [] })
    }
    socketHandler.onRecentMessages = recentMessages => {
      // Receive recent messages of the joined room,
      // should receive right after joining room.
      // Shoudn't display recent messages if there's
      // any messages already being displayed, e.g. joined
      // the room then went offline then back online
      if (this.state.messages.length === 0) {
        recentMessages.forEach(msg => {
          msg.self =
            msg.userId.toString() === this.context.account.id.toString()
          msg.time = moment.utc(msg.timestamp)
        })
        this.setState({ messages: recentMessages })
      }
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

    this.state.messages.forEach(msg => {
      // If same user is talking, no need to show user's avatar again
      let showUser = true
      // If it's been more than 5 mins since last msg
      let showTimestamp = false
      let timeDisplay = null

      if (lastMsg) {
        if (lastMsg.userId.toString() === msg.userId.toString())
          showUser = false
        if (msg.time.diff(lastMsg.time) > 5 * 60 * 1000) {
          showTimestamp = true
          showUser = true
        }
      } else {
        showTimestamp = true
        showUser = true
      }

      if (showTimestamp) {
        if (moment().diff(msg.time) > 24 * 60 * 60 * 1000)
          timeDisplay = msg.time.local().format("MMMDo A HH:mm")
        else timeDisplay = msg.time.local().format("A HH:mm")
      }

      messages.push(
        <Message
          withHoverCard={true}
          key={index++}
          data={msg}
          showUser={showUser}
          timeDisplay={timeDisplay}
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
