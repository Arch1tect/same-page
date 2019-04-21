import React, { useEffect, useContext } from "react"

import AccountContext from "context/account-context"
import Header from "./Header"
import Body from "./Body"
import Footer from "./Footer"

import socket from "./socket"

function Chat(props) {
  const accountContext = useContext(AccountContext)
  const account = accountContext.account

  useEffect(() => {
    socket.on("login", data => {
      console.log("socket login")
      socket.emit("login", {
        username: account.username,
        userId: account.userId,
        // roomId: "https://www.baidu.com/",
        // roomId: "baidu.com",
        roomId: "https://www.hulu.com/welcome",
        url: "https://www.hulu.com/welcome", // added field in v2.6.0

        version: "4.0.0",
        lang: "en",
        pageTitle: ""
        // token: chatboxConfig.token
      })
    })
  }, [])

  return (
    <div>
      <Header />
      <Body />
      <Footer />
    </div>
  )
}

export default Chat
