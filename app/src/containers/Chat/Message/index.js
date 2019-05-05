import React from "react"

import MessageBody from "./Body"
import AvatarWithHoverCard from "containers/OtherProfile/AvatarWithHoverCard"
import { Avatar } from "antd"

/*
props includes:
  avatarSrc
  username
  text
  type: text/emoji/img
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
  if (user.self) {
    textAlign = "right"
    messageHeader = (
      <div style={{ marginTop: 10 }}>
        <span style={userNameStyle}>{user.name}</span>
        <Avatar size="small" icon="user" src={user.avatarSrc} />
      </div>
    )
  } else {
    messageHeader = (
      <div style={{ marginTop: 10 }}>
        <AvatarWithHoverCard size="small" user={user} />
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
      <MessageBody type={data.type} text={data.text} />
    </div>
  )
}

export default ChatMessage
