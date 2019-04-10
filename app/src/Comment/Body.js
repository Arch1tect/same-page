import React from "react"
import Message from "./Message"

const commentBodyStyle = {
  height: "calc(100% - 67px)",
  overflow: "auto",
  width: "100%",
  position: "fixed",
  background: "#eceff1",
  padding: 10,
  paddingBottom: 50
}

function CommentBody(props) {
  const data = props.data || []
  let index = 0
  const comments = data.map(comment => {
    return <Message key={index++} data={comment} />
  })

  return <div style={commentBodyStyle}>{comments}</div>
}

export default CommentBody
