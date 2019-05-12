import React from "react"
import { Icon, message } from "antd"

import Tab from "containers/Tab"
import AccountContext from "context/account-context"
import socketManager, { socketHandler } from "socket/socket"
import storageManager from "utils/storage"
import axios from "axios"
import moment from "moment"
require("moment/locale/zh-cn") //moment bug, has to manually include

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: null,
      // Load account from storage is the first step of the app
      // Do not mount any component until loading completed
      // MUST initialize as true
      loadingFromStorage: true
    }
    const locale = window.navigator.userLanguage || window.navigator.language
    if (locale.indexOf("zh") > -1) {
      moment.locale("zh-cn")
      console.debug("chinese")
    }
    console.log(locale)
  }

  componentDidMount() {
    axios.interceptors.response.use(
      response => {
        // Do something with response data
        return response
      },
      error => {
        // set account to null when we receive 401
        if (error.response.status === 401) {
          this.setAccount(null)
        }
        let errorMessage = "出错了"
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
      this.setState({ loadingFromStorage: false })
      if (account) {
        console.debug("found account in storage")
        console.debug(account)
        this.setState({ account: account })
      } else {
        console.debug("no account found in storage")
      }
    })
    storageManager.addEventListener("account", account => {
      this.setState({ account: account })
    })
    socketHandler.onConnected = () => {
      message.success("连接成功！")
    }
    socketHandler.onDisconnected = () => {
      message.warn("连接已断开")
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

  render() {
    if (this.state.loadingFromStorage) {
      return (
        <center>
          <Icon style={{ marginTop: "50%" }} type="loading" />
        </center>
      )
    }
    let tab = "chat"
    if (!this.state.account) {
      tab = "account"
    }
    return (
      <AccountContext.Provider
        value={{ account: this.state.account, setAccount: this.setAccount }}
      >
        <Tab tab={tab} />
      </AccountContext.Provider>
    )
  }
}

export default App
