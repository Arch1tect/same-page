import React, { useContext } from "react"
import { Avatar } from "antd"
import TabContext from "context/TabContext"

import urls from "config/urls"

const usersStyle = {
  background: "white",
  position: "fixed",
  zIndex: 1,
  left: 0,
  width: "100%",
  overflow: "auto",
  maxHeight: "50%",
  padding: 5,
  paddingTop: 10,
  borderBottom: "1px solid lightgray"
}

function User(props) {
  const tabContext = useContext(TabContext)
  return (
    <div
      className="sp-online-user"
      onClick={() => tabContext.selectOtherUser(props)}
      key={props.userId}
    >
      <Avatar icon="user" src={props.avatarSrc} />
      <div className="sp-online-user-username">{props.username}</div>
    </div>
  )
}

function Users(props) {
  const users = (props.users || []).map(user => {
    if (user.hasAvatar) {
      user.avatarSrc = urls.cloudFront + user.userId + ".jpg"
    }
    return User(user)
  })

  return <div style={usersStyle}>{users}</div>
}

export default Users
