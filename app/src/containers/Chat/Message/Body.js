import "./Body.css"

import React from "react"
import { Popover, Button, Icon } from "antd"

import socketManager from "socket"

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
  if (data.type === "invite") {
    content = (
      <div>
        <a target="_blank" rel="noopener noreferrer" href={data.mediaSrc}>
          <Icon style={{ marginRight: 5 }} type="link" />
          {content}
        </a>
      </div>
    )
  }
  const popoverContent = (
    <Button
      onClick={() => {
        socketManager.sendEvent("delete message", { messageId: data.id })
      }}
      style={{ border: "none" }}
      icon="delete"
    />
  )
  const popoverPlacement = data.self ? "left" : "right"
  if (props.showMenu) {
    return (
      <Popover
        overlayClassName="sp-message-menu"
        placement={popoverPlacement}
        content={popoverContent}
        trigger="hover"
      >
        <div className={className}>{content}</div>
      </Popover>
    )
  }
  return <div className={className}>{content}</div>
}

export default MessageBody
