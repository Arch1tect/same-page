import React from "react"
import { Form, Icon, Input, Button } from "antd"

import { login } from "services/account"
import storageManager from "utils/storage"
import AccountContext from "context/account-context"

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    storageManager.get("login", values => {
      if (values) {
        this.props.form.setFieldsValue({
          userId: values.userId,
          password: values.password
        })
        console.log(this.context)
        if (this.context.autoLogin) {
          this.context.stopAutoLogin()
          this.loginUser(values)
        }
        console.debug("found login in storage")
      } else {
        console.debug("no login found in storage")
      }
    })
  }

  loginUser = values => {
    this.setState({ loading: true })
    login(values.userId, values.password)
      .then(res => {
        console.debug(res.data)
        const account = res.data
        this.setState({ loading: false })
        this.props.setAccount(account)
        storageManager.set("login", values)
      })
      .catch(err => {
        console.error(err)
        this.setState({ loading: false })
      })
      .then(() => {
        // can't change state here because if succeed
        // component will be unmounted before we set loading
        // to be false
        // this.setState({ loading: false })
      })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.debug("Received values of form: ", values)
      if (!err) {
        this.loginUser(values)
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
            {/* 或
            {
              // eslint-disable-next-line
              <a>注册</a>
            } */}
          </Form.Item>
        </Form>
      </div>
    )
  }
}
NormalLoginForm.contextType = AccountContext

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
)

export default WrappedNormalLoginForm
