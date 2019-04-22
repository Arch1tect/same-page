import React from "react"
import axios from "axios"

import urls from "config/urls"
import { Form, Icon, Input, Button } from "antd"

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const payload = {
          id: values.userId,
          password: values.password
        }
        this.setState({ loading: true })
        axios
          .post(urls.dbAPI + "/db/user/login", payload)
          .then(res => {
            // this.setState({ submitting: false })
            console.log(res.data)
            const account = res.data
            this.setState({ loading: false })
            this.props.setAccount({
              token: account.token
            })
          })
          .catch(err => {
            console.error(err)
            this.setState({ loading: false })
          })
          .then(() => {
            // can't set it here because if succeed
            // component is unmounted
            // this.setState({ loading: false })
          })

        console.log("Received values of form: ", values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div className="sp-special-tab">
        <Form
          style={{ width: "70%", margin: "auto", marginTop: 100 }}
          onSubmit={this.handleSubmit}
          className="login-form"
        >
          <Form.Item>
            {getFieldDecorator("userId", {
              rules: [{ required: true, message: "请输入用户ID" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="ID"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ marginRight: 10 }}
              loading={this.state.loading}
            >
              登录
            </Button>
            或 <a href="">注册</a>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
)

export default WrappedNormalLoginForm
