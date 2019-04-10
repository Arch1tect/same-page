import React from "react"
import Message from "./Message"

function CommentBody(props) {
  const data = props.data || []
  let index = 0
  const comments = data.map(comment => {
    return <Message key={index++} data={comment} />
  })

  return <div className="sp-comment-body">{comments}</div>
}

export default CommentBody
