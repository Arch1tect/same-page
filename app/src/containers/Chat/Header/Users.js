import React, { useContext } from "react"
import { Avatar } from "antd"
import TabContext from "context/tab-context"

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

function Users(props) {
  const tabContext = useContext(TabContext)

  const users = (props.users || []).map(user => {
    if (user.hasAvatar) {
      user.avatarSrc = urls.cloudFront + user.userId + ".jpg"
    }
    return (
      <div
        className="sp-online-user"
        onClick={() => tabContext.selectOtherUser(user)}
        key={user.userId}
      >
        <Avatar
          title={user.username}
          size={45}
          shape="square"
          icon="user"
          src={user.avatarSrc}
        />
        <div className="sp-online-user-username">{user.username}</div>
      </div>
    )
  })

  return <div style={usersStyle}>{users}</div>
}

export default Users
