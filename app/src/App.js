import React from "react"
import { Icon, message } from "antd"

import Tab from "containers/Tab"
import AccountContext from "context/account-context"
import socketManager, { socketHandler } from "socket/socket"
import storageManager from "utils/storage"
import axios from "axios"
import moment from "moment"
require("moment/locale/zh-cn") //moment.js bug, has to manually include

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: null,
      // A few steps before mounting the app
      // 1. Check local/chrome storage to see if there's account data
      // , if so, mount the app.
      // 2. If no account in storage, check if there's credential data
      // in storage, if so, mount the app and auto login
      // 3. If neither account nor credential data is in storage,
      // mount the app and auto register

      // In short, do not mount until done loading account/credential
      // from storage

      // above comment needs update
      loadingFromStorage: true,
      // Only if there is no account data in storage on page load
      // autoLogin only once per page load
      autoLogin: false
    }
    const locale = window.navigator.userLanguage || window.navigator.language
    if (locale.indexOf("zh") > -1) {
      moment.locale("zh-cn")
    }
    // console.debug(locale)
    message.config({
      top: 80,
      duration: 2,
      maxCount: 3
    })
  }

  componentDidMount() {
    axios.interceptors.response.use(
      response => {
        // Do something with response data
        return response
      },
      error => {
        let errorMessage = "出错了"
        // set account to null when we receive 401
        if (error.response && error.response.status === 401) {
          this.setAccount(null)
          errorMessage = "请重新登录"
        }
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          errorMessage = error.response.data.error
        }
        message.error(errorMessage)
        return Promise.reject(error)
      }
    )
    console.log("get account from storage, register account change listener")
    storageManager.get("account", account => {
      if (account) {
        console.debug("found account in storage")
        console.debug(account)
        this.setState({ account: account })
      } else {
        this.setState({ autoLogin: true })
        console.debug("no account found in storage")
      }
      this.setState({ loadingFromStorage: false })
    })
    storageManager.addEventListener("account", account => {
      this.setState({ account: account })
    })
    socketHandler.onConnected = () => {
      message.success("连接成功！", 2)
    }
    socketHandler.onDisconnected = () => {
      message.warn("连接已断开", 2)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Need to differentiate login/logout with profile info update
    // maybe shouldn't have grouped them in one object?
    const login = !prevState.account && this.state.account
    const logout = prevState.account && !this.state.account
    if (login) {
      console.debug("logged in")
      axios.defaults.headers.common["token"] = this.state.account.token
      socketManager.connect(this.state.account, true)
    }
    if (logout) {
      console.debug("logged out")
      axios.defaults.headers.common["token"] = null
      socketManager.disconnect()
      // TODO:  change tab?
    }
  }

  setAccount = account => {
    console.debug("set account")
    storageManager.set("account", account)
  }

  stopAutoLogin = () => {
    this.setState({ autoLogin: false })
  }

  render() {
    if (this.state.loadingFromStorage) {
      return (
        <center>
          <Icon style={{ marginTop: "50%" }} type="loading" />
        </center>
      )
    }
    let tab = "home"
    if (!this.state.account) {
      tab = "account"
    }
    return (
      <AccountContext.Provider
        value={{
          account: this.state.account,
          setAccount: this.setAccount,
          autoLogin: this.state.autoLogin,
          stopAutoLogin: this.stopAutoLogin
        }}
      >
        <Tab tab={tab} />
      </AccountContext.Provider>
    )
  }
}

export default App
