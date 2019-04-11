import "./Message.css"

import React from "react"
import { Avatar, Icon } from "antd"

function Comment(props) {
  const data = props.data
  let avatar = <Avatar size="large" className="sp-comment-avatar" icon="user" />
  if (data.avatarSrc) {
    avatar = (
      <Avatar size="large" className="sp-comment-avatar" src={data.avatarSrc} />
    )
  }

  return (
    <div style={{ marginTop: 10 }}>
      {avatar}
      <div className="sp-message-body">
        <div style={{ marginBottom: 5 }}>
          <span className="sp-comment-username">{data.name}</span>
          <span className="sp-comment-time">{data.time}</span>
        </div>
        <div>{data.content}</div>
        <div className="sp-comment-footer">
          <span>
            <Icon type="like" />
            <span className="sp-comment-score">{data.score}</span>
          </span>
          <span className="sp-comment-reply">回复</span>
        </div>
      </div>
    </div>
  )
}

export default Comment
