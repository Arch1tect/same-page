import "./Inbox.css"
import React, { useEffect, useState, useContext } from "react"
import { Avatar, Icon, Radio } from "antd"

import Conversation from "./Conversation"
import { getMessages } from "services/message"
import AccountContext from "context/account-context"

function Inbox(props) {
  const [conversations, setConvasations] = useState({})
  const [loading, setLoading] = useState(false)
  const [conversation, setConvasation] = useState()
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

  const rows = Object.keys(conversations).map(userId => {
    const conversation = conversations[userId]
    const user = conversation.user
    return (
      <div
        onClick={() => {
          setConvasation(conversation)
        }}
        key={user.id}
        className="sp-inbox-row"
      >
        <Avatar icon="user" src={user.avatarSrc} />
        <span className="sp-row-right">
          <div>{user.name}</div>
          <div className="sp-message-content">
            {conversation["messages"][0]["content"]}
          </div>
        </span>
      </div>
    )
  })

  return (
    <div className="sp-inbox-tab">
      {conversation && (
        <Conversation
          back={() => {
            setConvasation(null)
          }}
          data={conversation}
        />
      )}
      {!conversation && (
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
