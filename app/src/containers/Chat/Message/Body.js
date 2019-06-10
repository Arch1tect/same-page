import "./Body.css"

import React from "react"

function MessageBody(props) {
  const data = props.data
  let content = data.content
  let className = "sp-message-body " + data.type
  if (data.type === "sticker") {
    let imgSrc = content
    content = <img alt={imgSrc} src={imgSrc} />
  }
  if (data.type === "image") {
    let imgSrc = content
    content = <img className="sp-message-image" alt={imgSrc} src={imgSrc} />
  }
  if (data.type === "video") {
    content = <div className="sp-message-media">视频</div>
  }
  return <div className={className}>{content}</div>
}

export default MessageBody
