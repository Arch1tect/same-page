import "./Conversation.css"

import React, { useContext, useState, useRef } from "react"
import { Avatar, Icon, Input, Button } from "antd"

import Message from "containers/Chat/Message"
import { postMessage } from "services/message"
import AccountContext from "context/account-context"
import TabContext from "context/tab-context"

const conversationBodyStyle = {
  height: "calc(100% - 107px)",
  overflow: "auto",
  width: "100%",
  position: "fixed",
  background: "#f6f9fc",
  padding: 10,
  paddingBottom: 50
}

const AUTO_SCROLL_TRESHOLD_DISTANCE = 100

function Conversation(props) {
  const account = useContext(AccountContext).account
  const tabContext = useContext(TabContext)
  const messages = props.conversation.messages
  const other = props.conversation.user
  const offset = props.offset
  const [input, setInput] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const bodyRef = useRef()
  const inputRef = useRef()

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
  function scrollToBottomIfNearBottom() {
    const bodyDiv = bodyRef.current
    if (
      bodyDiv.scrollHeight - bodyDiv.scrollTop - bodyDiv.offsetHeight <
      AUTO_SCROLL_TRESHOLD_DISTANCE
    ) {
      setTimeout(() => {
        bodyDiv.scrollTop = bodyDiv.scrollHeight
      }, 100)
    }
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      setSubmitting(true)
      postMessage(other.id, input, offset)
        .then(resp => {
          props.mergeAndSaveNewConversations(resp.data)
          scrollToBottomIfNearBottom()
          setInput("")
          setTimeout(() => {
            inputRef.current.focus()
          }, 100)
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
          <span>
            与
            <span
              className="sp-conversation-username"
              onClick={() => tabContext.selectOtherUser(other)}
            >
              {other.name}
            </span>
            的对话
          </span>
        </center>
      </div>
      <div ref={bodyRef} style={conversationBodyStyle}>
        {body}
      </div>
      <div className="sp-chat-bottom">
        <Input
          ref={inputRef}
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
