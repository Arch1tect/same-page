import "./Message.css"

import React, { useContext } from "react"
import { Icon } from "antd"
import AvatarWithHoverCard from "Profile/AvatarWithHoverCard"

function Comment(props) {
  const data = props.data

  return (
    <div style={{ marginTop: 10 }} className={data.self ? "self" : ""}>
      <AvatarWithHoverCard className="sp-comment-message-avatar" data={data} />
      <div className="sp-message-body">
        <div style={{ marginBottom: 5 }}>
          <span className="sp-comment-message-username">{data.name}</span>
          <span className="sp-comment-message-time">{data.time}</span>
        </div>
        <div>{data.content}</div>
        <div className="sp-comment-message-footer">
          <span>
            <Icon type="like" />
            <span className="sp-comment-message-score">{data.score}</span>
          </span>
          <span
            onClick={() => props.reply(data.userId, data.name)}
            className="sp-comment-message-reply"
          >
            回复
          </span>
        </div>
      </div>
    </div>
  )
}

export default Comment
