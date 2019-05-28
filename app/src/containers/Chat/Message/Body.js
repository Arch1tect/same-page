import "./Body.css"

import React from "react"

function MessageBody(props) {
  const data = props.data
  let content = data.content
  let className = "sp-message-body " + data.type
  if (data.type === "sticker") {
    // TODO: maybe centralize this code for getting image path
    let imgSrc = content
    // if (window.chrome && window.chrome.extension) {
    //   imgSrc = window.chrome.extension.getURL(content)
    // }
    content = <img alt={imgSrc} src={imgSrc} />
  }
  return <div className={className}>{content}</div>
}

export default MessageBody
