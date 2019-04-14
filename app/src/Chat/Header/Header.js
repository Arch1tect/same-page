import "./Header.css"

import React, { useState } from "react"
import { Switch, Radio, Button } from "antd"
import { Row, Col } from "antd"

import socket from "../socket"
import Users from "./Users"
import urls from "config/urls"

function togglePageOrSiteChat(e) {
  console.log(e.target.value)
}
function toggleOnline(val) {
  console.log(val)
}

function ChatHeader(props) {
  const [showUsers, toggleUsers] = useState(false)
  const [users, setUsers] = useState([])
  window.setOnlineUsers = setUsers
  // Todo: use effect maybe?
  socket.on("user joined", data => {
    // console.debug(data.onlineUsers)
    setUsers(data.onlineUsers)
  })
  socket.on("user left", data => {
    setUsers(data.onlineUsers)
  })
  window.addEventListener(
    "message",
    e => {
      if (e.origin === urls.debugMsgSrc) {
        setUsers(e.data)
      }
    },
    false
  )

  return (
    <div className="sp-tab-header">
      <Row justify="center">
        <Col style={{ textAlign: "left" }} span={8}>
          <Button size="small" icon="notification" />
        </Col>
        <Col span={8}>
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
            defaultValue="a"
            buttonStyle="solid"
            onChange={props.addLiveMsg}
          >
            <Radio.Button value="a">网页</Radio.Button>
            <Radio.Button value="b">网站</Radio.Button>
          </Radio.Group>
        </Col>
        <Col style={{ textAlign: "right" }} span={8}>
          <Button
            onClick={() => toggleUsers(!showUsers)}
            size="small"
            icon="team"
          >
            <span style={{ marginLeft: 5 }}>{users.length}</span>
          </Button>
        </Col>
      </Row>
      {showUsers && <Users users={users} />}
    </div>
  )
}

export default ChatHeader
