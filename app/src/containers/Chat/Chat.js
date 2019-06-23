import React, { useState, useEffect } from "react"

import Header from "./Header"
import Body from "./Body"
import Footer from "./Footer"
import MusicTab from "containers/Music"
import socketManager from "socket/socket"

function Chat(props) {
  const [mediaDisplay, setMediaDisplay] = useState("none")
  const [mediaNum, setMediaNum] = useState(0)

  useEffect(() => {
    // Ask parent about room info when mounted
    socketManager.sendEvent("get room info")
  }, [])

  return (
    <div>
      <span style={{ display: mediaDisplay }}>
        <MusicTab
          back={() => {
            setMediaDisplay("none")
          }}
          setMediaNum={setMediaNum}
        />
      </span>
      <Header
        mediaNum={mediaNum}
        showMusic={() => {
          setMediaDisplay("block")
        }}
      />
      <Body
        displayMusicTab={() => {
          setMediaDisplay("block")
        }}
      />
      <Footer />
    </div>
  )
}

export default Chat
