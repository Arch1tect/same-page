import "./Footer.css"

import React, { useState, useContext, useRef } from "react"
import { Input, Icon } from "antd"

import Emoji from "components/Emoji"
import AccountContext from "context/account-context"
import socketManager from "socket/socket"

const MESSAGE_TIME_GAP = 2 * 1000
let lastMsgTime = 0

function Footer(props) {
  const [input, setInput] = useState("")
  const inputRef = useRef()
  const [showEmoji, setShowEmoji] = useState(false)
  const accountContext = useContext(AccountContext)
  const account = accountContext.account

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      const now = new Date()
      if (now - lastMsgTime > MESSAGE_TIME_GAP) {
        let msg = {
          msg: input,
          // TODO: no need to send username
          // socket server remembers it during login
          username: account.username
        }
        socketManager.sendMessage(msg)
        setInput("")
        lastMsgTime = now
      } else {
        console.error("too fast")
      }
    }
  }
  const addEmoji = emoji => {
    setInput(input => {
      return input + emoji.native
    })
    inputRef.current.focus()
  }

  const handleChange = e => {
    setInput(e.target.value)
  }

  let content = (
    <center style={{ padding: 10, background: "lightgray" }}>尚未登录</center>
  )
  if (account) {
    const emojiBtn = (
      <Icon
        className="emojiOpener"
        onClick={e => {
          setShowEmoji(prevState => {
            setShowEmoji(!prevState)
          })
        }}
        type="smile"
      />
    )

    content = (
      <Input
        ref={inputRef}
        size="large"
        onKeyDown={handleKeyDown}
        value={input}
        addonBefore={emojiBtn}
        addonAfter={<Icon type="paper-clip" />}
        onChange={handleChange}
        placeholder="请输入。。。"
      />
    )
  }

  return (
    <div className="sp-chat-bottom">
      {showEmoji && (
        <Emoji
          addEmoji={addEmoji}
          exceptionClass="emojiOpener"
          close={() => {
            setShowEmoji(false)
          }}
        />
      )}
      {content}
    </div>
  )
}

export default Footer
