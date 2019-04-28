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

  let messageHeader = null
  let textAlign = "left"
  if (data.self) {
    textAlign = "right"
    messageHeader = (
      <div style={{ marginTop: 10 }}>
        <span style={userNameStyle}>{data.username}</span>
        <Avatar
          size="small"
          icon="user"
          src={data.avatarSrc}
          size={data.size}
        />
      </div>
    )
  } else {
    messageHeader = (
      <div style={{ marginTop: 10 }}>
        <AvatarWithHoverCard size="small" data={data} />
        <span style={userNameStyle}>{data.username}</span>
      </div>
    )
  }
  if (props.mergeAbove) {
    messageHeader = <span />
  }

  return (
    <div
      className={data.self ? "self" : "other"}
      style={{ textAlign: textAlign }}
    >
      {messageHeader}
      <MessageBody type={data.type} text={data.text} />
    </div>
  )
}

export default ChatMessage
