import React, { useState, useEffect } from "react"
import { Icon } from "antd"

import { getPopularRooms } from "services/room"

function Rooms(props) {
  const [loading, setLoading] = useState(true)
  const [rooms, setRooms] = useState([])
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
    let url = room
    if (url === "lobby") {
      url = "https://yiyechat.com"
    } else if (room.indexOf("http") === -1) {
      url = "http://" + url
    }

    return (
      <div className="sp-home-comment" key={room}>
        <a className="sp-comment-url" target="_blank" href={url}>
          {room}
        </a>
      </div>
    )
  })
}

export default Rooms
