import "./Comment.css"

import React, { useState, useEffect } from "react"
import moment from "moment"

import AvatarWithHoverCard from "containers/OtherProfile/AvatarWithHoverCard"
import { getLatestComments } from "services/comment"

function Comments(props) {
  const [comments, setComments] = useState([])
  useEffect(() => {
    getLatestComments()
      .then(resp => {
        setComments(resp.data)
      })
      .catch()
      .then()
  })
  return comments.map(comment => (
    <div className="sp-home-comment" key={comment.id}>
      <a className="sp-comment-url" target="_blank" href={comment.url}>
        {comment.url}
      </a>
      <div className="sp-comment-body">
        <AvatarWithHoverCard
          className="sp-comment-message-avatar"
          user={comment.user}
        />
        <span className="sp-comment-message">{comment.content}</span>
      </div>
      {/* <div className="sp-message-body text">
        <div style={{ marginBottom: 5 }}>
          <span className="sp-comment-message-username">
            {comment.user.name}
          </span>
          <span className="sp-comment-message-time">
            {moment.utc(comment.created).fromNow()}
          </span>
        </div>
        <div>{comment.content}</div>
      </div> */}
    </div>
  ))
}

export default Comments
