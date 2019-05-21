import React, { useState, useEffect } from "react"

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
  return comments.map(comment => <div key={comment.id}>{comment.content}</div>)
}

export default Comments
