import "./Inbox.css"
import React, { useEffect, useState } from "react"
import { Avatar, Icon, Radio, Button } from "antd"

import { getMessages } from "services/message"

function Inbox(props) {
  const [conversations, setConvasations] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
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
  }, [])

  const rows = Object.keys(conversations).map(userId => {
    const conversation = conversations[userId]
    const user = conversation.user
    return (
      <div key={user.id} className="sp-inbox-row">
        <Avatar icon="user" src={user.avatarSrc} />
        <span className="sp-row-right">
          <div>{user.name}</div>
          <div className="sp-message-content">
            {conversation["messages"][0]["message"]}
          </div>
        </span>
      </div>
    )
  })

  return (
    <div className="sp-inbox-tab">
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
      <div className="sp-tab-body">
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
  )
}

export default Inbox
