import "./Playlist.css"
import React, { useState, useEffect } from "react"
import moment from "moment"

import AvatarWithHoverCard from "containers/OtherProfile/AvatarWithHoverCard"

function Playlist(props) {
  const [playlist, setPlaylist] = useState([])
  const [index, setIndex] = useState()
  useEffect(() => {
    window.addToPlaylist = item => {
      // not used
      setPlaylist(prevPlaylist => {
        const newPlaylist = [...prevPlaylist, item]
        setPlaylist(newPlaylist)
      })
    }
    window.setPlaylist = items => {
      // console.log(items)
      setPlaylist(items)
    }
    window.setMediaIndex = setIndex
  }, [])

  useEffect(() => {
    const playerPlaylist = playlist.map(item => {
      return {
        sources: [
          {
            src: item.mediaSrc,
            // "https://gcs-vimeo.akamaized.net/exp=1560245928~acl=%2A%2F1179870085.mp4%2A~hmac=9c6c7fa89f7b161eef96222a13a78fd6ed477842b02e213bccd0d88ad7ff271c/vimeo-prod-skyfire-std-us/01/1432/12/307163785/1179870085.mp4",
            type: "video/mp4"
          }
        ]
      }
    })
    console.log(playerPlaylist)
    window.player.playlist(playerPlaylist)
    props.setMediaNum(playerPlaylist.length)
  }, [playlist])

  return playlist.map((msg, i) => {
    let timeDisplay = msg.time.local().format("A HH:mm")
    if (moment().diff(msg.time) > 24 * 60 * 60 * 1000)
      timeDisplay = msg.time.local().format("MMMDo A HH:mm")

    let className = "sp-playlist-item"
    if (i === index) {
      className += " selected"
    }
    return (
      <div
        onClick={() => {
          window.player.playlist.currentItem(i)
          window.player.play()
        }}
        className={className}
        key={msg.time.valueOf()}
      >
        <AvatarWithHoverCard
          className="sp-chat-message-avatar"
          // size="large"
          user={msg.user}
        />
        <span>发送于{timeDisplay}</span>
      </div>
    )
  })
}

export default Playlist
