import React, { useState, useEffect, useContext } from "react"
import { Avatar, Icon, Button, Row, Col } from "antd"
import axios from "axios"

import urls from "config/urls"
import TabContext from "context/tab-context"

const avatarStyle = {
  margin: "auto",
  marginTop: 20,
  display: "block"
}

const aboutStyle = {
  display: "inline-block",
  minWidth: 200,
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

function displayUserId(id) {
  // To be deleted
  // old client is still sending uuid
  // do not show uuid, only show number id
  if (!isNaN(id)) {
    return id
  }
  return ""
}

function OtherProfile(props) {
  if (!props.data) return <span />
  const tabContext = useContext(TabContext)

  const basicUser = {
    avatarSrc: props.data.avatarSrc,
    name: props.data.name,
    id: props.data.userId || props.data.id
  }
  const [user, setUser] = useState(basicUser)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios
      .get(urls.dbAPI + "/api/v1/user/" + basicUser.id)
      .then(resp => {
        console.debug(resp.data)
        setUser(resp.data)
      })
      .catch(err => {
        console.error(err)
      })
      .then(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="sp-special-tab">
      <Button
        onClick={() => tabContext.selectOtherUser()}
        style={{
          position: "fixed",
          marginTop: 5,
          marginLeft: 5,
          border: "none",
          fontSize: "large"
        }}
        icon="arrow-left"
      />
      {loading && (
        <Icon
          style={{
            position: "fixed",
            marginTop: 10,
            right: 10,
            border: "none",
            fontSize: "large"
          }}
          type="loading"
        />
      )}

      <Avatar style={avatarStyle} size={128} src={user.avatarSrc} icon="user" />
      <center style={{ margin: 20, fontSize: "large", fontWeight: "bold" }}>
        {user.name}
      </center>
      <Row gutter={50} style={{ textAlign: "center" }}>
        <Col style={{ textAlign: "right" }} span={12}>
          ID: {displayUserId(user.id)}
        </Col>
        <Col style={{ textAlign: "left" }} span={12}>
          关注者: {user.followerCount}
        </Col>
      </Row>
      <br />
      <center>
        <div style={aboutStyle}>{user.about}</div>

        <div style={{ marginTop: 30 }}>
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
        </div>
      </center>
    </div>
  )
}

export default OtherProfile
