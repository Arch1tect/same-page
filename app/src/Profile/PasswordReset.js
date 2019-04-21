import React, { useState } from "react"
import { Button, Row, Col, Input } from "antd"

function PasswordReset(props) {
  const [newPwd, setNewPwd] = useState("")
  const [confirmPwd, setConfirmPwd] = useState("")

  return (
    <div className="sp-special-tab">
      <Button
        onClick={() => {
          props.setResetPasswordState(false)
        }}
        style={{
          position: "fixed",
          marginTop: 5,
          marginLeft: 10,
          border: "none",
          fontSize: "large"
        }}
        icon="arrow-left"
      />

      <div style={{ width: "80%", margin: "auto" }}>
        <center>
          <h3 style={{ marginTop: 50 }}>修改密码</h3>
        </center>
        <Row type="flex" align="top" gutter={10} style={{ marginTop: 30 }}>
          <Col style={{ textAlign: "right" }} span={8}>
            新密码:
          </Col>
          <Col style={{ textAlign: "left" }} span={16}>
            <Input
              onChange={e => setNewPwd(e.target.value)}
              // style={inputStyle}
              // size="small"
              value={newPwd}
            />
          </Col>
        </Row>
        <Row gutter={10} style={{ marginTop: 10 }}>
          <Col style={{ textAlign: "right" }} span={8}>
            再次确认:
          </Col>
          <Col style={{ textAlign: "left" }} span={16}>
            <Input
              onChange={e => setConfirmPwd(e.target.value)}
              // style={inputStyle}
              // size="small"
              value={confirmPwd}
            />
          </Col>
        </Row>

        <center>
          <Button style={{ marginTop: 50 }} type="primary" size="large">
            保存
          </Button>
        </center>
      </div>
    </div>
  )
}

export default PasswordReset
