import * as io from "socket.io-client"

import urls from "config/urls"
import { getUrl, getDomain } from "utils/url"
import { getPageTitle } from "utils/pageTitle"
let _socket = null

const _config = {
  account: null,
  // roomId: page url/site domain/lobby
  // TODO: default roomId should be kept in one place
  // right now Header.js also need to specify default
  // chosen radio button is site
  roomId: getDomain()
}

const socketManager = {
  sendMessage: msg => {
    _socket.emit("new message", msg)
  },
  updatePageInfo: data => {
    if (_socket && _socket.connected) _socket.emit("page update", data)
    else {
      console.error("socket not connected")
    }
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
    _socket = io(urls.socketAPI, { path: "/socket.io" })

    _socket.on("new message", data => {
      if (socketHandler.onLiveMsg) {
        socketHandler.onLiveMsg(data)
      } else {
        console.warn("onLiveMsg not defined")
      }
    })
    _socket.on("recent messages", data => {
      if (socketHandler.onRecentMessages) {
        socketHandler.onRecentMessages(data)
      } else {
        console.warn("onRecentMessages not defined")
      }
    })
    _socket.on("users in room", data => {
      // all users in the room
      // console.debug("usersInRoom")
      // console.log(data)
      if (socketHandler.usersInRoom) {
        socketHandler.usersInRoom(data.users)
      } else {
        console.warn("usersInRoom not defined")
      }
    })
    _socket.on("new user", data => {
      // single new user joined the room
      // console.debug("new user")
      // console.log(data)
      if (socketHandler.onUserJoin) {
        socketHandler.onUserJoin(data.user)
      } else {
        console.warn("onUserJoin not defined")
      }
    })
    _socket.on("user gone", data => {
      // console.debug("user gone")
      // console.debug(data)
      if (socketHandler.onUserLeft) {
        socketHandler.onUserLeft(data.user)
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
        roomId: _config.roomId,
        url: getUrl(), // added field in v2.6.0
        version: "4.1.0", // TODO: get from config
        lang: "en", // TODO
        pageTitle: getPageTitle(),
        token: _config.account.token
      })
    })
    _socket.on("alert", data => {
      if (socketHandler.onAlert) {
        socketHandler.onAlert(data)
      } else {
        console.warn("onAlert not defined")
      }
    })
  },
  togglePageSite: roomId => {
    // TODO: rename this to changeRoom
    _config.roomId = roomId
    const onRoomChangeCallbackKeys = Object.keys(
      socketHandler.onRoomChangeCallbacks
    )
    if (onRoomChangeCallbackKeys.length) {
      onRoomChangeCallbackKeys.forEach(key => {
        socketHandler.onRoomChangeCallbacks[key](roomId)
      })
    } else {
      console.warn("onRoomChangeCallbacks empty")
    }
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
export const socketHandler = {
  onRoomChangeCallbacks: {}
}
export default socketManager
