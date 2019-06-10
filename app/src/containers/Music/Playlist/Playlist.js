import React, { useState, useEffect } from "react"
import Message from "containers/Chat/Message"

function Playlist() {
  const [playlist, setPlaylist] = useState([])
  useEffect(() => {
    window.addToPlaylist = item => {
      setPlaylist(prevPlaylist => {
        const newPlaylist = [...prevPlaylist, item]
        setPlaylist(newPlaylist)
      })
    }
    window.setPlaylist = items => {
      // console.log(items)
      setPlaylist(items)
    }
  }, [])

  useEffect(() => {
    const playerPlaylist = playlist.map(item => {
      return {
        sources: [
          {
            src: item.content
            // "https://fpdl.vimeocdn.com/vimeo-prod-skyfire-std-us/01/1353/13/331768732/1305089800.mp4?token=1560152424-0x8a3cc50785c78e042769bc845da2258f037bd15c",
            // type: "video/mp4"
          }
        ]
      }
    })
    // console.log(playerPlaylist)
    window.player.playlist(playerPlaylist)
  }, [playlist])

  return playlist.map(msg => (
    <Message
      withHoverCard={true}
      key={msg.time.valueOf()}
      data={msg}
      showUser={true}
      // timeDisplay={timeDisplay}
    />

    // <div key={item.time.valueOf()}>
    //   {item.content}
    //   <br />
    //   <br />
    //   <br />
    // </div>
  ))
}

export default Playlist
