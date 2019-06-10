import React, { useState, useEffect } from "react"

function Playlist() {
  const [playlist, setPlaylist] = useState([])
  useEffect(() => {
    window.addToPlaylist = item => {
      setPlaylist(prevPlaylist => {
        const newPlaylist = [...prevPlaylist, item]
        setPlaylist(newPlaylist)
      })
    }
  }, [])

  useEffect(() => {
    window.player.playlist(playlist)
  }, [playlist])

  return playlist.map(item => <div>item</div>)
}

export default Playlist
