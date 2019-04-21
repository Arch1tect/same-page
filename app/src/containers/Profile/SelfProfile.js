import React, { useState, useEffect, useContext } from "react"
import { Avatar, Button, Row, Col } from "antd"
import axios from "axios"

import urls from "config/urls"
import AccountContext from "context/account-context"
import TabContext from "context/tab-context"
import ResetPassword from "./ResetPassword"
import EditProfile from "./EditProfile"
const avatarStyle = {
  margin: "auto",
  marginTop: 20,
  display: "block"
}
const ProfileBodyStyle = {
  height: "calc(100% - 35px)",
  overflowY: "auto",
  overflowX: "hidden",
  width: "100%",
  position: "fixed",
  // background: "rgb(249, 249, 249)",
  padding: 20,
  paddingTop: 10,
  paddingBottom: 30
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

function SelfProfile(props) {
  const accountContext = useContext(AccountContext)
  const account = accountContext.account

  // const [user, setUser] = useState(basicUser)
  const [resettingPassword, setResetPasswordState] = useState(false)
  const [edittingProfile, setEdittingProfileState] = useState(false)

  // useEffect(() => {
  //   axios.get(urls.dbAPI + "/db/user/" + props.data.userId).then(resp => {
  //     console.log(resp.data)
  //     if (resp.data.length) {
  //       // Todo: backend should return just 1
  //       const data = resp.data[0]
  //       user.username = data.name
  //       user.userId = data.id
  //       user.about = data.about
  //       user.followers = data.followers.length
  //       setUser({ ...user })
  //     }
  //   })
  // }, [])

  return (
    <div>
      {resettingPassword && (
        <ResetPassword setResetPasswordState={setResetPasswordState} />
      )}
      {edittingProfile && (
        <EditProfile setEdittingProfileState={setEdittingProfileState} />
      )}

      <div style={ProfileBodyStyle}>
        <Avatar
          style={avatarStyle}
          size={128}
          src={account.avatarSrc}
          icon="user"
        />
        <center style={{ margin: 20, fontSize: "large", fontWeight: "bold" }}>
          {account.username}
        </center>
        <Row gutter={50} style={{ textAlign: "center" }}>
          <Col style={{ textAlign: "right" }} span={12}>
            ID: {account.userId}
          </Col>
          <Col style={{ textAlign: "left" }} span={12}>
            关注者: {account.followers}
          </Col>
        </Row>
        <br />
        <center>
          <div style={aboutStyle}>{account.about}</div>
          <div style={{ marginTop: 30 }}>
            <Button
              type="primary"
              icon="edit"
              style={{ margin: 10 }}
              size="large"
              onClick={() => {
                setEdittingProfileState(true)
              }}
            >
              修改资料
            </Button>
          </div>
          <br />
          <br />
          <Button
            onClick={() => {
              setResetPasswordState(true)
            }}
            style={{ margin: 10 }}
          >
            更改密码
          </Button>
          <Button type="danger" style={{ margin: 10 }}>
            登出
          </Button>
        </center>
      </div>
    </div>
  )
}

export default SelfProfile
