import "./Conversation.css"

import React, { useContext, useState } from "react"
import { Avatar, Icon, Input, Button } from "antd"

import Message from "containers/Chat/Message"
import { postMessage } from "services/message"
import AccountContext from "context/account-context"

const conversationBodyStyle = {
  height: "calc(100% - 107px)",
  overflow: "auto",
  width: "100%",
  position: "fixed",
  background: "#f6f9fc",
  padding: 10,
  paddingBottom: 50
}

function Conversation(props) {
  const account = useContext(AccountContext).account
  const messages = props.conversation.messages
  const other = props.conversation.user
  const offset = props.offset
  const [input, setInput] = useState("")
  const [submitting, setSubmitting] = useState(false)

  let lastMsg = null
  const body = messages.map(msg => {
    msg.text = msg.content
    if (msg.self) {
      msg.name = account.name
      msg.avatarSrc = account.avatarSrc
      msg.userId = account.id
    } else {
      msg.name = other.name
      msg.avatarSrc = other.avatarSrc
      msg.userId = other.id
    }
    let mergeAbove = false
    if (lastMsg && lastMsg.userId === msg.userId) mergeAbove = true
    lastMsg = msg
    return <Message key={msg.id} data={msg} mergeAbove={mergeAbove} />
  })
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      setSubmitting(true)
      postMessage(other.id, input, offset)
        .then(resp => {
          props.mergeAndSaveNewConversations(resp.data)
          setInput("")
        })
        .catch(err => {
          console.error(err)
        })
        .then(() => {
          setSubmitting(false)
        })
    }
  }
  return (
    <div className="sp-inbox-conversation">
      <Button onClick={props.back} className="sp-back-btn" icon="arrow-left" />
      <div className="sp-tab-header">
        <center>
          {/* <Button icon="refresh" size="small">
            刷新
          </Button> */}
          <span>与{other.name}的对话</span>
        </center>
      </div>
      <div style={conversationBodyStyle}>{body}</div>
      <div className="sp-chat-bottom">
        <Input
          disabled={submitting}
          size="large"
          onKeyDown={handleKeyDown}
          value={input}
          addonBefore={<Icon type="smile" />}
          onChange={e => {
            setInput(e.target.value)
          }}
          placeholder="请输入。。。"
        />
      </div>
    </div>
  )
}
export default Conversation
