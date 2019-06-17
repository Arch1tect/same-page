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
    content = (
      <img
        onClick={() => {
          console.debug("click on image")
          window.parent.postMessage({ imgSrc: imgSrc }, "*")
        }}
        className="sp-message-image"
        alt={imgSrc}
        src={imgSrc}
      />
    )
  }
  if (data.type === "video" || data.type === "audio") {
    content = (
      <div
        onClick={() => {
          window.playMessage(data)
          props.displayMusicTab()
        }}
        className="sp-message-media"
      >
        {content}
      </div>
    )
  }
  return <div className={className}>{content}</div>
}

export default MessageBody
