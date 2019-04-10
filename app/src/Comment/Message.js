import React from "react"
import { Avatar, Icon } from "antd"

function Comment(props) {
  const data = props.data
  let avatar = <Avatar size="small" icon="user" />
  if (data.avatarSrc) {
    avatar = <Avatar size="small" src={data.avatarSrc} />
  }
  let messageHeader = (
    <div style={{ marginTop: 10 }}>
      {avatar}
      <span className="sp-chat-username">{data.name}</span>
    </div>
  )

  return (
    <div>
      {messageHeader}
      <div className="sp-message-body">{data.content}</div>
    </div>
  )
}

export default Comment
