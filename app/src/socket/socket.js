import * as io from "socket.io-client"

import urls from "config/urls"

let _socket = null
let _account = null
const socketManager = {
  sendMessage: msg => {
    _socket.emit("new message", msg)
  },
  // connect should be called when user is logged in
  // after user data is properly set
  connect: account => {
    _account = account
    if (_socket) {
      console.debug("socket already created, reconnect")
      if (_socket.connected) {
        console.warn("socket currently connected")
      } else {
        _socket.connect()
      }
      return
    } else {
      console.debug("create socket and connect!")
    }
    _socket = io("https://api.yiyechat.com", { path: "/socket.io" })

    _socket.on("new message", data => {
      console.debug(data)
      // TODO: move following data massaging work to backend
      data.self = data.sender.toString() === account.id.toString()
      data.type = "text"
      if (data.message.startsWith("stickers/")) {
        data.type = "sticker"
      }
      data.content = data.message
      data.userId = data.sender
      data.name = data.username
      if (data.hasAvatar) {
        data.avatarSrc = urls.cloudFront + data.userId + ".jpg"
      }

      if (socketHandler.onLiveMsg) {
        socketHandler.onLiveMsg(data)
      } else {
        console.warn("onLiveMsg not defined")
      }
    })
    _socket.on("user joined", data => {
      console.debug("user joined")
      if (socketHandler.onUserJoin) {
        socketHandler.onUserJoin(data)
      } else {
        console.warn("onUserJoin not defined")
      }
    })
    _socket.on("user left", data => {
      console.debug("user left")
      if (socketHandler.onUserLeft) {
        socketHandler.onUserLeft(data)
      } else {
        console.warn("onUserLeft not defined")
      }
    })
    _socket.on("login", data => {
      console.debug("connected, login as " + _account.id)
      _socket.emit("login", {
        username: _account.name,
        userId: _account.id,
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
  },
  disconnect: () => {
    if (_socket) {
      if (_socket.connected) {
        console.debug("disconnect socket")
        _socket.disconnect()
      } else {
        console.warn("socket not connected, no need to disconnect")
      }
    } else {
      console.warn("socket not created, cannot disconnect")
    }
  }
}
export const socketHandler = {}
export default socketManager
