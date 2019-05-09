import "./Inbox.css"
import React, { useEffect, useState, useContext, useRef } from "react"
import { Avatar, Icon, Radio } from "antd"
import moment from "moment"

import Conversation from "./Conversation"
import { getMessages } from "services/message"
import AccountContext from "context/account-context"
import storageManager from "utils/storage"

function Inbox(props) {
  const user = props.user
  const setUser = props.setUser
  const account = useContext(AccountContext).account
  let storageKey = "inbox-"
  if (account) storageKey += account.id
  const prevAccountRef = useRef()
  const [conversations, setConversations] = useState({})
  // offset equals to the biggest message id
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
      setConversations({ ...conversations, [user.id]: selectedConversation })
    }
  }
  function getMessagesFromServer(offset) {
    setLoading(true)
    getMessages(offset)
      .then(resp => {
        // Merge with existing data
        mergeAndSaveNewConversations(resp.data)
      })
      .catch(err => {
        console.error(err)
      })
      .then(() => {
        setLoading(false)
      })
  }
  function mergeAndSaveNewConversations(newConversations) {
    // merge and save new conversations into storage
    storageManager.get(storageKey, conversations => {
      conversations = conversations || {}
      Object.keys(newConversations).forEach(userId => {
        if (userId in conversations) {
          conversations[userId].messages.push(
            ...newConversations[userId].messages
          )
          // use the new user data
          conversations[userId].user = newConversations[userId].user
        } else {
          conversations[userId] = newConversations[userId]
        }
      })
      storageManager.set(storageKey, conversations)
    })
  }
  function getOffset(conversations) {
    let offset = 0
    Object.values(conversations).forEach(c => {
      if (c.messages.length) {
        c.lastMsg = c.messages[c.messages.length - 1]
        offset = Math.max(offset, c.lastMsg.id)
      }
    })
    return offset
  }

  useEffect(() => {
    // console.debug("register inbox storage listener")
    // storageManager.addEventListener("inbox", conversations => {
    //   setConversations(conversations)
    // })
  }, [])

  useEffect(() => {
    // Listen for account change, 2 cases:
    // 1. not logged in => logged in  (this may not be when
    // the whole app logged in, since Inbox component is mounted
    // later than the App component)
    // 2. logged in => logged out

    // There shouldn't be a case that's logged in as user A
    // then suddenly changed to user B without going through
    // a log out step

    // When logged in
    // 0. clear messages in memory (not in storage)
    // 1. get messages from storage
    // 2. get new messages from server using offset and save into storage

    // When logged out, clear the memory

    if (account) {
      if (!prevAccountRef.current) {
        // If logged in as a different account or first time login?
        console.debug("[inbox] logged in, load from storage")
        storageManager.get(storageKey, conversations => {
          conversations = conversations || {}
          setConversations(conversations)
          console.debug("[inbox] loaded from storage, fetch from server")
          getMessagesFromServer(getOffset(conversations))
        })
        console.debug("register inbox storage listener")
        // TODO: if same account login and logout and login again
        // this listener is registered multiple times, should unregister
        // when logout
        storageManager.addEventListener(storageKey, conversations => {
          console.debug("[inbox] storage updated")
          setConversations(conversations)
        })
      }
    } else {
      console.debug("[inbox] logged out")
      setUser(null)
      setConversations({})
      // Clear memory
    }

    prevAccountRef.current = account
  }, [account])

  // Backend/storage returns dictionary data structure so
  // it's easy to insert new conversation
  // Need to convert into array and sort by date to display
  // Also get offset
  const conversationsArray = Object.keys(conversations).map(userId => {
    const c = conversations[userId]
    if (c.messages.length) {
      c.lastMsg = c.messages[c.messages.length - 1]
      c.time = moment.utc(c.lastMsg.created)
    } else {
      // if no message, this is user attempting to start conversation
      c.time = moment.utc()
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

  if (!account) {
    return (
      <div className="sp-inbox-tab">
        <center className="sp-tab-header">尚未登录</center>
      </div>
    )
  }
  return (
    <div className="sp-inbox-tab">
      {selectedConversation && (
        <Conversation
          back={() => {
            setUser(null)
          }}
          offset={getOffset(conversations)}
          conversation={selectedConversation}
          mergeAndSaveNewConversations={mergeAndSaveNewConversations}
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
          <div className="sp-tab-body" style={{ paddingBottom: 70 }}>
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
