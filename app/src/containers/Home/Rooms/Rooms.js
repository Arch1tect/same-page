import "./Room.css"

import React, { useState, useEffect, useContext } from "react"
import { Icon } from "antd"

import TabContext from "context/tab-context"
import { getPopularRooms } from "services/room"
import socketManager from "socket/socket"

function Rooms(props) {
  const [loading, setLoading] = useState(true)
  const [rooms, setRooms] = useState([])
  const tabContext = useContext(TabContext)

  useEffect(() => {
    getPopularRooms()
      .then(resp => {
        setRooms(resp.data)
      })
      .catch(err => {})
      .then(() => {
        setLoading(false)
      })
  }, [])
  if (loading)
    return (
      <center>
        <Icon type="loading" />
      </center>
    )
  return rooms.map(room => {
    let roomId = room.roomId
    return (
      <center
        className="sp-home-chatroom"
        key={roomId}
        onClick={() => {
          if (roomId === "lobby") {
            tabContext.changeTab("chat")
            socketManager.togglePageSite("lobby")
            return
          }
          window.open(room.url)
        }}
      >
        <span className="sp-chatroom-metadata">
          {room.title}
          <br /> <span style={{ fontSize: "smaller" }}>{room.userCount}人</span>
        </span>
      </center>
    )
  })
}

export default Rooms
