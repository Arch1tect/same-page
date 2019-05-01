import React from "react"
import { Icon } from "antd"

import Tab from "containers/Tab"
import AccountContext from "context/account-context"
import socketManager from "socket/socket"
import storageManager from "utils/storage"
import axios from "axios"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: null,
      loadingFromStorage: true
    }
  }

  componentDidMount() {
    axios.interceptors.response.use(
      response => {
        // Do something with response data
        return response
      },
      error => {
        // set account to null when we receive 401
        // TODO: display error msg
        if (error.response.status === 401) {
          this.setAccount(null)
        }
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
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Need to differentiate login/logout with profile info update
    // maybe shouldn't have grouped them in one object?
    const login = !prevState.account && this.state.account
    const logout = prevState.account && !this.state.account
    if (login) {
      console.debug("logged in")
      axios.defaults.headers.common["token"] = this.state.account.token
      socketManager.connect(this.state.account)
    }
    if (logout) {
      console.debug("logged out")
      axios.defaults.headers.common["token"] = null
      socketManager.disconnect()
      // TODO:  change tab?
    }
  }

  setAccount = account => {
    console.log("set account")
    storageManager.set("account", account)
  }

  render() {
    if (this.state.loadingFromStorage) {
      return (
        <center>
          <Icon type="loading" />
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
