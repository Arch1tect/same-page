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
  const [users, setUsers] = useState([])
  const accountContext = useContext(AccountContext)
  const tabContext = useContext(TabContext)

  // TODO: need to change back to class component
  // if need access to users state
  // like Body.js
  // no, not really
  useEffect(() => {
    console.log("register user join/left handlers")
    socketHandler.onUserJoin = data => {
      setUsers(data.onlineUsers)
    }
    socketHandler.onUserLeft = data => {
      setUsers(data.onlineUsers)
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
        <Row justify="center">
          <Col style={{ textAlign: "left" }} span={8}>
            {/* <Button
              style={{ border: "none" }}
              size="small"
              icon="notification"
            /> */}
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
              defaultValue="site"
              buttonStyle="solid"
              onChange={e => {
                socketManager.togglePageSite(e.target.value)
                console.log(e.target.value)
              }}
            >
              <Tooltip placement="bottom" title={getUrl()}>
                <Radio.Button value="page">网页</Radio.Button>
              </Tooltip>
              <Tooltip placement="bottom" title={getDomain()}>
                <Radio.Button value="site">网站</Radio.Button>
              </Tooltip>
            </Radio.Group>
          </Col>
          <Col style={{ textAlign: "right" }} span={8}>
            <Button
              style={{ border: "none" }}
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
  return <div className="sp-tab-header">{content}</div>
}

export default ChatHeader
