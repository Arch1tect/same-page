import "./Header.css"

import React, { useState, useEffect, useContext } from "react"
import { Radio, Button, Tooltip } from "antd"

import socketManager from "socket/socket"
import Users from "./Users"
import AccountContext from "context/account-context"
import TabContext from "context/tab-context"
import { getUrl, getDomain } from "utils/url"

function ChatHeader(props) {
  const [showUsers, toggleUsers] = useState(false)

  // const [room, setRoom] = useState(getDomain())
  const [room, setRoom] = useState("lobby")
  const [users, setUsers] = useState([])
  const accountContext = useContext(AccountContext)
  const tabContext = useContext(TabContext)

  useEffect(() => {
    console.log("register user join/left handlers")
    socketManager.addHandler("new user", "add_user_to_room", user => {
      setUsers(users => {
        // TODO: dedup
        return [...users, user]
      })
    })
    socketManager.addHandler("user gone", "remove_user_from_room", user => {
      setUsers(users => {
        return users.filter(u => {
          return u.id.toString() !== user.id.toString()
        })
      })
    })
    socketManager.addHandler("users in room", "set_users_in_room", users => {
      setUsers(users)
    })
    socketManager.addHandler("disconnect", "clear_users_in_room", () => {
      setUsers([])
    })
    window.setRoom = setRoom
    return () => {
      // No clean up because chat header is never unmounted after mounted
      console.error("[Headerjs] this cleanup should never run")
      socketManager.removeHandler("new user", "add_user_to_room")
      socketManager.removeHandler("user gone", "remove_user_from_room")
      socketManager.removeHandler("users in room", "set_users_in_room")
      socketManager.removeHandler("disconnect", "clear_users_in_room")
      window.setRoom = null
    }
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
        <Button
          style={{ border: "none", position: "absolute", left: 5 }}
          onClick={() => props.showMusic()}
          size="small"
          icon="unordered-list"
        >
          <span style={{ marginLeft: 5 }}>{props.mediaNum}</span>
        </Button>
        <Radio.Group
          className="sp-toggle-page-site-chat"
          size="small"
          value={room}
          buttonStyle="solid"
          onChange={e => {
            const roomId = e.target.value
            socketManager.changeRoom(roomId)
            setUsers([])
            setRoom(roomId)
          }}
        >
          <Tooltip placement="bottom" title="anywhere">
            <Radio.Button value="lobby">大厅</Radio.Button>
          </Tooltip>
          {/* <Tooltip placement="bottom" title={getDomain()}>
            <Radio.Button value={getDomain()}>网站</Radio.Button>
          </Tooltip> */}
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
