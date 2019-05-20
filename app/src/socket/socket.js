import * as io from "socket.io-client"

import urls from "config/urls"
import { getUrl, getDomain } from "utils/url"

let _socket = null

const _config = {
  account: null,
  // pageOrSite: "site" //page, site, lobby
  // TODO: default roomId should be kept in one place
  // right now Header.js also need to specify default
  // chosen radio button is site
  roomId: getDomain()
}
function _sendDanmu(message) {
  const danmuMsg = {
    msg: message
  }
  window.parent.postMessage(danmuMsg, "*")
}
const socketManager = {
  sendMessage: msg => {
    _socket.emit("new message", msg)
  },
  // connect should be called when user is logged in
  // after user data is properly set
  // socket is initilized only once, callbacks are registered
  // only once, should only update socket config but not callbacks
  connect: account => {
    _config.account = account
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
      data.self = data.sender.toString() === _config.account.id.toString()
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
      _sendDanmu(data)
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
    _socket.on("disconnect", data => {
      console.debug("disconnect")
      if (socketHandler.onDisconnected) {
        socketHandler.onDisconnected(data)
      } else {
        console.warn("onDisconnected not defined")
      }
    })
    _socket.on("login", data => {
      console.debug("connected, login as " + _config.account.id)
      if (socketHandler.onConnected) {
        socketHandler.onConnected(data)
      } else {
        console.warn("onConnected not defined")
      }

      _socket.emit("login", {
        username: _config.account.name,
        userId: _config.account.id,
        // roomId: _config.pageOrSite === "page" ? getUrl() : getDomain(),
        roomId: _config.roomId,
        url: getUrl(), // added field in v2.6.0
        version: "4.0.0",
        lang: "en", // TODO
        pageTitle: ""
        // token: chatboxConfig.token TODO
      })
    })
  },
  togglePageSite: roomId => {
    // TODO: don't really have to reconnect
    // just tell socket server to change room
    // _config.pageOrSite = pageOrSite
    _config.roomId = roomId
    _socket.disconnect()
    setTimeout(() => {
      _socket.connect()
    }, 500)
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
