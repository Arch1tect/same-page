import React from "react"
import { Avatar, Icon } from "antd"

const usernameStyle = {
  fontSize: "smaller",
  marginBottom: 5,
  fontWeight: "bold"
}

const avatarStyle = {
  verticalAlign: "top",
  marginTop: 5,
  marginRight: 5
}

function Comment(props) {
  const data = props.data
  let avatar = <Avatar style={avatarStyle} icon="user" />
  if (data.avatarSrc) {
    avatar = <Avatar style={avatarStyle} src={data.avatarSrc} />
  }

  return (
    <div style={{ marginTop: 10 }}>
      {avatar}
      <div className="sp-message-body">
        <div style={usernameStyle}>{data.name}</div>
        {data.content}
      </div>
    </div>
  )
}

export default Comment
