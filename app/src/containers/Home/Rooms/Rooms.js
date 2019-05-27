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
    if (roomId === "lobby") {
      return (
        <div className="sp-home-comment" key={roomId}>
          <div
            className="sp-comment-url"
            onClick={() => {
              tabContext.changeTab("chat")
              socketManager.togglePageSite("lobby")
            }}
          >
            聊天大厅 ({room.userCount})
          </div>
        </div>
      )
    }

    return (
      <div className="sp-home-comment" key={roomId}>
        <a
          className="sp-comment-url"
          rel="noopener noreferrer"
          target="_blank"
          href={room.url}
        >
          {room.title} ({room.userCount})
        </a>
      </div>
    )
  })
}

export default Rooms
