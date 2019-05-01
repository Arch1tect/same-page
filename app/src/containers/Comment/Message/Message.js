import "./Message.css"

import React, { useState } from "react"
import { Icon } from "antd"
import AvatarWithHoverCard from "containers/OtherProfile/AvatarWithHoverCard"

function Comment(props) {
  const data = props.data
  const [score, setScore] = useState(data.score)
  const [voted, setVoted] = useState(data.voted)
  function theme() {
    if (voted) return "twoTone"
    return "outlined"
  }
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
            <Icon
              theme={theme()}
              onClick={() => {
                setScore(prevScore => {
                  if (voted) return prevScore - 1
                  return prevScore + 1
                })
                setVoted(prevState => {
                  return !prevState
                })
                props.vote(data.id)
              }}
              type="like"
            />
            <span className="sp-comment-message-score">{score}</span>
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
