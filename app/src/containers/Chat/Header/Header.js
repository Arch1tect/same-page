import "./Header.css"

import React, { useState, useEffect, useContext } from "react"
import { Radio, Button, Tooltip } from "antd"
import { Row, Col } from "antd"

import socketManager, { socketHandler } from "socket/socket"
import Users from "./Users"
import AccountContext from "context/account-context"
import TabContext from "context/tab-context"
import urls from "config/urls"
import { getUrl, getDomain } from "utils/url"

function ChatHeader(props) {
  const [showUsers, toggleUsers] = useState(false)
  // which room socket is in, the source of truth isn't
  // in the UI, it's in the socket module, UI subscribe
  // to change of socket module
  const [room, setRoom] = useState(getDomain())
  const [users, setUsers] = useState([])
  const accountContext = useContext(AccountContext)
  const tabContext = useContext(TabContext)

  useEffect(() => {
    console.log("register user join/left handlers")
    socketHandler.onUserJoin = data => {
      setUsers(data.onlineUsers)
    }
    socketHandler.onUserLeft = data => {
      setUsers(data.onlineUsers)
    }
    socketHandler.onRoomChange = room => {
      setRoom(room)
    }
    window.addEventListener(
      "message",
      e => {
        if (e.origin === urls.debugMsgSrc) {
          setUsers(e.data)
        }
      },
      false
    )
    return () => {
      socketHandler.onUserJoin = null
      socketHandler.onUserLeft = null
    }
    // No clean up because chat header is never unmounted after mounted
  }, [])

  let content = (
    <center>
      <Button
        onClick={() => {
          tabContext.changeTab("account")
        }}
        size="small"
        type="primary"
      >
        去登录
      </Button>
    </center>
  )
  if (accountContext.account) {
    content = (
      <div>
        {/* <Switch
        className="sp-toggle-online"
        checkedChildren="在线"
        unCheckedChildren="离线"
        defaultChecked
        onChange={toggleOnline}
      /> */}

        <Radio.Group
          className="sp-toggle-page-site-chat"
          size="small"
          value={room}
          buttonStyle="solid"
          onChange={e => {
            const val = e.target.value
            // setRoom(val)
            socketManager.togglePageSite(val)
          }}
        >
          <Tooltip placement="bottom" title="anywhere">
            <Radio.Button value="lobby">大厅</Radio.Button>
          </Tooltip>
          <Tooltip placement="bottom" title={getDomain()}>
            <Radio.Button value={getDomain()}>网站</Radio.Button>
          </Tooltip>
          <Tooltip placement="bottom" title={getUrl()}>
            <Radio.Button value={getUrl()}>网页</Radio.Button>
          </Tooltip>
        </Radio.Group>
        {/* <Col style={{ textAlign: "right" }} span={8}> */}
        <Button
          style={{ border: "none", position: "absolute", right: 0 }}
          onClick={() => toggleUsers(!showUsers)}
          size="small"
          icon="team"
        >
          <span style={{ marginLeft: 5 }}>{users.length}</span>
        </Button>
        {showUsers && <Users users={users} />}
      </div>
    )
  }
  return <center className="sp-tab-header">{content}</center>
}

export default ChatHeader
