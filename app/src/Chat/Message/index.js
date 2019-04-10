import React, { Component } from "react"
import { Avatar, Radio } from "antd"

import MessageBody from "./Body"

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
  console.log("render chat message")
  const data = props.data
  let avatar = null
  if (data.avatarSrc) {
    avatar = <Avatar size="small" src={data.avatarSrc} />
  } else {
    avatar = <Avatar size="small" icon="user" />
  }
  let messageHeader = null
  let textAlign = "left"
  if (data.self) {
    textAlign = "right"
    messageHeader = (
      <div style={{ marginTop: 10 }}>
        <span style={userNameStyle}>{data.username}</span>
        {avatar}
      </div>
    )
  } else {
    messageHeader = (
      <div style={{ marginTop: 10 }}>
        {avatar}
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
