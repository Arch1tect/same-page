import "./Footer.css"

import React, { useState, useContext } from "react"
import { Input, Icon } from "antd"

import AccountContext from "context/account-context"
import socket from "../socket"
const MESSAGE_TIME_GAP = 2 * 1000
let lastMsgTime = 0

function Footer(props) {
  const [input, setInput] = useState("")
  const accountContext = useContext(AccountContext)
  const account = accountContext.account

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      const now = new Date()
      if (now - lastMsgTime > MESSAGE_TIME_GAP) {
        let msg = {
          msg: input,
          // TODO: no need to send username
          username: account.username
        }
        socket.emit("new message", msg)
        setInput("")
        lastMsgTime = now
      } else {
        console.error("too fast")
      }
    }
  }

  const handleChange = e => {
    setInput(e.target.value)
  }

  return (
    <div className="sp-chat-bottom">
      <Input
        size="large"
        onKeyDown={handleKeyDown}
        value={input}
        addonBefore={<Icon type="smile" />}
        addonAfter={<Icon type="paper-clip" />}
        onChange={handleChange}
        placeholder="请输入。。。"
      />
    </div>
  )
}

export default Footer
