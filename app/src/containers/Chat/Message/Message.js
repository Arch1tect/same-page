import React from "react"

import MessageBody from "./Body"
import AvatarWithHoverCard from "containers/OtherProfile/AvatarWithHoverCard"
import { Avatar } from "antd"

/*
This is used by chat messages and direct messages
props includes:
  user: object
  content
  type: text/sticker
  self
*/
const userNameStyle = {
  fontSize: "smaller",
  verticalAlign: "middle",
  marginLeft: 5,
  marginRight: 5
}

function ChatMessage(props) {
  const data = props.data
  const user = data.user
  const showUser = props.showUser // avatar and name
  const timeDisplay = props.timeDisplay

  let userInfo = ""

  let avatar = <Avatar size="small" icon="user" src={user.avatarSrc} />
  if (!data.self && props.withHoverCard) {
    avatar = (
      <AvatarWithHoverCard
        className="sp-chat-message-avatar"
        size="small"
        user={user}
      />
    )
  }
  let messageTime = ""
  if (timeDisplay) {
    messageTime = (
      <center
        style={{
          marginTop: 30,
          marginBottom: -10,
          color: "gray",
          fontSize: "smaller"
        }}
      >
        {timeDisplay}
      </center>
    )
  }
  if (showUser) {
    if (data.self) {
      userInfo = (
        <div style={{ marginTop: 20 }}>
          <span style={userNameStyle}>{user.name}</span>
          {avatar}
        </div>
      )
    } else {
      userInfo = (
        <div style={{ marginTop: 20 }}>
          {avatar}
          <span style={userNameStyle}>{user.name}</span>
        </div>
      )
    }
  }
  return (
    <div
      className={data.self ? "self" : "other"}
      style={{ textAlign: data.self ? "right" : "left" }}
    >
      {messageTime}
      {userInfo}
      <MessageBody data={data} />
    </div>
  )
}

export default ChatMessage
