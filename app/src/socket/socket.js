import * as io from "socket.io-client"

let socket = null
const socketManager = {
  sendMessage: msg => {
    socket.emit("new message", msg)
  },
  // connect should be called when user is logged in
  // after user data is properly set
  connect: () => {
    if (socket) {
      console.debug("socket already created, reconnect")
      socket.connect()
      return
    } else {
      console.debug("create socket and connect!")
    }
    socket = io("https://api.yiyechat.com", { path: "/socket.io" })

    socket.on("new message", data => {
      console.debug("new message")
      data.name = data.username
      if (socketHandler.onLiveMsg) {
        socketHandler.onLiveMsg(data)
      } else {
        console.warn("onLiveMsg not defined")
      }
    })
    socket.on("user joined", data => {
      console.debug("user joined")
      if (socketHandler.onUserJoin) {
        socketHandler.onUserJoin(data)
      } else {
        console.warn("onUserJoin not defined")
      }
    })
    socket.on("user left", data => {
      console.debug("user left")
      if (socketHandler.onUserLeft) {
        socketHandler.onUserLeft(data)
      } else {
        console.warn("onUserLeft not defined")
      }
    })
    socket.on("login", data => {
      console.debug("connected, login now")
      socket.emit("login", {
        username: "account.name",
        userId: "account.userId",
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
  }
}
export const socketHandler = {}
export default socketManager
