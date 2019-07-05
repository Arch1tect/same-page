import "./Footer.css"

import React, { useContext } from "react"
import { message, Button, Popconfirm } from "antd"

import InputWithPicker from "components/InputWithPicker"
import AccountContext from "context/account-context"
import socketManager from "socket/socket"
import { getUrl } from "utils/url"

const MESSAGE_TIME_GAP = 3 * 1000
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
      message.warn("请放慢速度")
      return false
    }
  }

  let content = (
    <center style={{ padding: 10, background: "lightgray" }}>尚未登录</center>
  )
  if (account) {
    content = (
      <InputWithPicker
        send={send}
        addonAfter={
          <Popconfirm
            title="确定要分享你所在的网页地址?"
            onConfirm={() => {
              const payload = {
                msg: getUrl(),
                type: "invite"
              }
              socketManager.sendMessage(payload)
            }}
            okText="好的，分享！"
            cancelText="取消操作"
            placement="topRight"
          >
            <Button icon="environment" />
          </Popconfirm>
        }
      />
    )
  }

  return <div className="sp-chat-bottom">{content}</div>
}

export default Footer
