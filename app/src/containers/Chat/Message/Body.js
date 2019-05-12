import "./Body.css"

import React from "react"

function MessageBody(props) {
  const data = props.data
  let content = data.content
  let className = "sp-message-body " + data.type
  if (data.type === "sticker") {
    // TODO: if extension, load from chrome://

    const imgSrc = process.env.PUBLIC_URL + content
    content = <img alt={imgSrc} src={imgSrc} />
  }
  return <div className={className}>{content}</div>
}

export default MessageBody
