import "./Footer.css"

import React, { useContext } from "react"

import InputWithPicker from "components/InputWithPicker"
import AccountContext from "context/account-context"
import socketManager from "socket/socket"

const MESSAGE_TIME_GAP = 2 * 1000
let lastMsgTime = 0

function Footer(props) {
  const accountContext = useContext(AccountContext)
  const account = accountContext.account

  const send = input => {
    const now = new Date()
    if (now - lastMsgTime > MESSAGE_TIME_GAP) {
      let msg = {
        msg: input,
        // TODO: no need to send username
        // socket server remembers it during login
        username: account.username
      }
      socketManager.sendMessage(msg)
      lastMsgTime = now
      return true
    } else {
      console.error("too fast")
      return false
    }
  }

  let content = (
    <center style={{ padding: 10, background: "lightgray" }}>尚未登录</center>
  )
  if (account) {
    content = <InputWithPicker send={send} />
  }

  return <div className="sp-chat-bottom">{content}</div>
}

export default Footer
