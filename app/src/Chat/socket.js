import * as io from "socket.io-client"
let socket = io("https://api.yiyechat.com", { path: "/socket.io" })
console.log("socket init!")

socket.on("login", data => {
  console.log("login")
  console.log(data)
  socket.emit("login", {
    username: "David",
    userId: "xyz",
    roomId: "https://www.baidu.com/",
    // roomId: "baidu.com",
    // roomId: "https://www.hulu.com/welcome",
    url: "https://www.hulu.com/welcome", // added field in v2.6.0

    version: "4.0.0",
    lang: "en",
    pageTitle: ""
    // token: chatboxConfig.token
  })
})

export default socket
