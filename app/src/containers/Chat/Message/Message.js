import React from "react"

import MessageBody from "./Body"
import AvatarWithHoverCard from "containers/OtherProfile/AvatarWithHoverCard"
import { Avatar } from "antd"

/*
This is used by chat messages and direct messages
props includes:
  avatarSrc
  username
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

  const user = {
    id: data.userId,
    name: data.name,
    self: data.self,
    avatarSrc: data.avatarSrc
  }

  let messageHeader = null
  let textAlign = "left"

  let avatar = <Avatar size="small" icon="user" src={user.avatarSrc} />
  if (!user.self && props.withHoverCard) {
    avatar = (
      <AvatarWithHoverCard
        className="sp-chat-message-avatar"
        size="small"
        user={user}
      />
    )
  }

  if (user.self) {
    textAlign = "right"
    messageHeader = (
      <div style={{ marginTop: 10 }}>
        <span style={userNameStyle}>{user.name}</span>
        {avatar}
      </div>
    )
  } else {
    messageHeader = (
      <div style={{ marginTop: 10 }}>
        {avatar}
        <span style={userNameStyle}>{user.name}</span>
      </div>
    )
  }
  if (props.mergeAbove) {
    messageHeader = <span />
  }

  return (
    <div
      className={user.self ? "self" : "other"}
      style={{ textAlign: textAlign }}
    >
      {messageHeader}
      <MessageBody data={data} />
    </div>
  )
}

export default ChatMessage
