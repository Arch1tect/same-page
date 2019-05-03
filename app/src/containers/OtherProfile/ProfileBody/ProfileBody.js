import React from "react"
import { Button, Avatar, Icon, Row, Col } from "antd"

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

function ProfileBody(props) {
  const { loading, loaded, user, following, followerCount, followUser } = props

  return (
    <div>
      <Avatar style={avatarStyle} size={128} src={user.avatarSrc} icon="user" />
      <center style={{ margin: 20, fontSize: "large", fontWeight: "bold" }}>
        {user.name}
        {loading && (
          <Icon
            style={{
              display: "block",
              marginTop: 10,
              border: "none"
            }}
            type="loading"
          />
        )}
      </center>
      {loaded && (
        <span>
          <Row gutter={50} style={{ textAlign: "center" }}>
            <Col style={{ textAlign: "right" }} span={12}>
              ID: {displayUserId(user.id)}
            </Col>
            <Col style={{ textAlign: "left" }} span={12}>
              关注者: {followerCount}
            </Col>
          </Row>
          <br />
          <center>
            <div style={aboutStyle}>{user.about}</div>
            <div style={{ marginTop: 30 }}>
              {following && (
                <Button
                  icon="user-delete"
                  style={{ margin: 10 }}
                  size="large"
                  onClick={() => {
                    followUser(false)
                  }}
                >
                  取消关注
                </Button>
              )}
              {!following && (
                <Button
                  type="primary"
                  icon="user-add"
                  style={{ margin: 10 }}
                  size="large"
                  onClick={() => {
                    followUser(true)
                  }}
                >
                  关注
                </Button>
              )}

              <Button icon="mail" style={{ margin: 10 }} size="large">
                私信
              </Button>
            </div>
          </center>
        </span>
      )}
    </div>
  )
}

export default ProfileBody
