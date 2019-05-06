import "./Inbox.css"
import React, { useEffect, useState, useContext } from "react"
import { Avatar, Icon, Radio } from "antd"
import moment from "moment"

import Conversation from "./Conversation"
import { getMessages } from "services/message"
import AccountContext from "context/account-context"

function Inbox(props) {
  const user = props.user
  const setUser = props.setUser
  const [conversations, setConvasations] = useState({})
  const [loading, setLoading] = useState(false)
  let selectedConversation = null
  if (user) {
    if (user.id in conversations) {
      selectedConversation = conversations[user.id]
    } else {
      selectedConversation = {
        user: user,
        messages: []
      }
      setConvasations({ ...conversations, [user.id]: selectedConversation })
    }
  }
  const account = useContext(AccountContext).account

  useEffect(() => {
    if (!account) return
    setLoading(true)
    getMessages()
      .then(resp => {
        setConvasations(resp.data)
      })
      .catch(err => {
        console.error(err)
      })
      .then(() => {
        setLoading(false)
      })
  }, [account])

  // Backend/storage returns dictionary data structure so
  // it's easy to insert new conversation
  // Need to convert into array and sort by date to display

  const conversationsArray = Object.keys(conversations).map(userId => {
    const c = conversations[userId]
    c.time = moment.utc(c.time)
    if (c.messages.length) {
      c.lastMsg = c.messages[c.messages.length - 1]
      c.time = moment.utc(c.lastMsg.created)
    }
    return c
  })
  conversationsArray.sort((a, b) => {
    return b.time - a.time
  })

  const rows = conversationsArray.map(c => {
    const user = c.user
    return (
      <div
        onClick={() => {
          setUser(user)
        }}
        key={user.id}
        className="sp-inbox-row"
      >
        <Avatar icon="user" src={user.avatarSrc} />
        <span className="sp-row-right">
          <div>
            {user.name}
            {c.lastMsg && (
              <span className="sp-message-time">{c.time.fromNow()}</span>
            )}
          </div>

          {c.lastMsg && (
            <div className="sp-message-content">{c.lastMsg.content}</div>
          )}
        </span>
      </div>
    )
  })

  return (
    <div className="sp-inbox-tab">
      {selectedConversation && (
        <Conversation
          back={() => {
            setUser(null)
          }}
          data={selectedConversation}
        />
      )}
      {!selectedConversation && (
        <div>
          <center className="sp-tab-header">
            <Radio.Group
              // className="sp-toggle-page-site-chat"
              size="small"
              defaultValue={true}
              buttonStyle="solid"
              onChange={e => {
                // setShowFollowers(e.target.value)
              }}
            >
              <Radio.Button value={true}>私信</Radio.Button>
              <Radio.Button value={false}>消息</Radio.Button>
            </Radio.Group>
          </center>
          <div className="sp-tab-body" style={{ paddingBottom: 30 }}>
            {loading && (
              <center>
                <Icon
                  style={{
                    marginTop: 10,
                    border: "none",
                    fontSize: "large"
                  }}
                  type="loading"
                />
              </center>
            )}

            {rows}
          </div>
        </div>
      )}
    </div>
  )
}

export default Inbox
