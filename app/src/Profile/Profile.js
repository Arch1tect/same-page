import React, { useState, useEffect, useContext } from "react"
import { Avatar, Button, Row, Col } from "antd"
import axios from "axios"

import urls from "config/urls"
import TabContext from "context/TabContext"

const avatarStyle = {
  margin: "auto",
  marginTop: 20,
  display: "block"
}

const aboutStyle = {
  width: "75%",
  maxWidth: 350,
  borderBottom: "1px solid lightgray",
  textAlign: "left",
  overflow: "auto",
  maxHeight: 72,
  padding: 5,
  paddingLeft: 10,
  paddingRight: 10,
  wordBreak: "break-word"
}

function SelfProfile(props) {
  const tabContext = useContext(TabContext)
  const basicUser = {
    userId: "1",
    username: "David"
  }
  const [user, setUser] = useState(basicUser)
  useEffect(() => {
    axios.get(urls.dbAPI + "/db/user/" + user.userId).then(resp => {
      console.log(resp.data)
      if (resp.data.length) {
        // Todo: backend should return just 1
        const data = resp.data[0]
        user.username = data.name
        user.userId = data.id
        user.about = data.about
        user.followers = data.followers.length
        setUser({ ...user })
      }
    })
  }, [])

  return (
    <div className="sp-special-tab">
      <Avatar style={avatarStyle} size={128} src={user.avatarSrc} icon="user" />
      <center style={{ margin: 20, fontSize: "large", fontWeight: "bold" }}>
        {user.username}
      </center>
      <Row gutter={50} style={{ textAlign: "center" }}>
        <Col style={{ textAlign: "right" }} span={12}>
          ID: {user.userId}
        </Col>
        <Col style={{ textAlign: "left" }} span={12}>
          关注者: {user.followers}
        </Col>
      </Row>
      <br />
      <center>
        <div style={aboutStyle}>{user.about}</div>
        <br />

        <Button
          type="primary"
          icon="user-add"
          style={{ margin: 10 }}
          size="large"
        >
          关注
        </Button>
        <Button icon="mail" style={{ margin: 10 }} size="large">
          私信
        </Button>
      </center>
    </div>
  )
}

export default SelfProfile
