import * as io from "socket.io-client"
let socket = io("https://api.yiyechat.com", { path: "/socket.io" })
console.log("socket init!")

export default socket
