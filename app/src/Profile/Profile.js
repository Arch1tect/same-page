import React, { useState, useEffect, useContext } from "react"
import { Divider, Radio, Avatar, Button, Row, Col, Input } from "antd"
import axios from "axios"

import urls from "config/urls"
import TabContext from "context/TabContext"

import AvatarUploader from "./AvatarUploader"
import PasswordReset from "./PasswordReset"
import ResetPassword from "./ResetPassword"

const TextArea = Input.TextArea

const ProfileBodyStyle = {
  height: "calc(100% - 50px)",
  overflow: "auto",
  width: "100%",
  position: "fixed",
  background: "rgb(249, 249, 249)",
  padding: 20,
  paddingTop: 10,
  paddingBottom: 30
}

const avatarStyle = {
  // margin: "auto",
  // display: "block"
}

const inputStyle = {
  // backgroundColor: "transparent",
  // border: "none",
  // borderBottom: "1px solid gray",
  maxWidth: 100
}

const aboutStyle = {
  // border: "none",
  // borderBottom: "1px solid gray",
  // backgroundColor: "transparent",
  width: "80%",
  overflow: "auto",
  wordBreak: "break-word"
}

function SelfProfile(props) {
  const tabContext = useContext(TabContext)
  const basicUser = {
    userId: "1",
    username: "David",
    aboutMe: ""
  }
  const [user, setUser] = useState(basicUser)
  const [resettingPassword, setResetPasswordState] = useState(false)
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
    <div>
      {resettingPassword && (
        <ResetPassword setResetPasswordState={setResetPasswordState} />
      )}
      <Row
        className="sp-tab-header"
        gutter={50}
        style={{ textAlign: "center" }}
      >
        <Col span={12}>
          <Button
            onClick={() => {
              setResetPasswordState(!resettingPassword)
            }}
            size="small"
          >
            更改密码
          </Button>
        </Col>
        <Col span={12}>
          <Button size="small" type="danger">
            登出
          </Button>
        </Col>
      </Row>
      <div style={ProfileBodyStyle}>
        <Divider
          style={{
            marginTop: 10,
            marginBottom: 25,
            fontSize: "small",
            color: "gray"
          }}
        >
          账号信息
        </Divider>
        <Row gutter={20} type="flex" align="middle">
          <Col style={{ textAlign: "right" }} span={12}>
            <Avatar
              style={avatarStyle}
              shape="square"
              size={100}
              src={user.avatarSrc}
              icon="user"
            />
          </Col>
          <Col
            style={{ textAlign: "left", fontSize: "small", fontWeight: "bold" }}
            span={12}
          >
            <div>ID: {user.userId}</div>
            <div>积分: {user.followers}</div>
            <div>关注了: {user.userId}</div>
            <div>关注者: {user.followers}</div>
          </Col>
        </Row>
        <Divider
          style={{
            marginTop: 35,
            marginBottom: 25,
            fontSize: "small",
            color: "gray"
          }}
        >
          编辑个人资料
        </Divider>

        <center>
          <div style={{ width: "100%", maxWidth: 400 }}>
            <Row gutter={10} style={{ marginTop: 15 }}>
              <Col style={{ textAlign: "right" }} span={8}>
                上传头像:
              </Col>
              <Col style={{ textAlign: "left" }} span={16}>
                <AvatarUploader />
              </Col>
            </Row>
            <Row gutter={10} style={{ marginTop: 10 }}>
              <Col style={{ textAlign: "right" }} span={8}>
                用户名:
              </Col>
              <Col style={{ textAlign: "left" }} span={16}>
                <Input style={inputStyle} size="small" value={user.username} />
              </Col>
            </Row>
            <Row gutter={10} style={{ marginTop: 10 }}>
              <Col style={{ textAlign: "right" }} span={8}>
                性别:
              </Col>
              <Col style={{ textAlign: "left" }} span={16}>
                <Radio.Group
                  onChange={e => {
                    user.sex = e.target.value
                    setUser({ ...user })
                  }}
                  value={user.sex}
                >
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </Radio.Group>
              </Col>
            </Row>
            <Row gutter={10} style={{ marginTop: 10 }}>
              <Col style={{ textAlign: "right" }} span={8}>
                个人简介:
              </Col>
              <Col style={{ textAlign: "left" }} span={16}>
                <TextArea
                  style={aboutStyle}
                  size="small"
                  value={user.about}
                  onChange={e => {
                    user.about = e.target.value
                    setUser({ ...user })
                  }}
                  autosize={{ minRows: 3, maxRows: 5 }}
                />
              </Col>
            </Row>
          </div>

          <Button type="primary" style={{ marginTop: 20 }} size="large">
            保存
          </Button>
        </center>
      </div>
    </div>
  )
}

export default SelfProfile
