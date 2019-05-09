import "./Body.css"

import React from "react"

function MessageBody(props) {
  const data = props.data
  let content = data.content
  if (data.type === "sticker") {
    // TODO: if extension, load from chrome://
    // otherwise load from Internet (low pri)
    content = (
      <img src="https://pic1.zhimg.com/v2-4fa02ebcfd360d192a57a059ce322db7_xl.jpg" />
    )
  }
  return <div className="sp-message-body">{content}</div>
}

export default MessageBody
