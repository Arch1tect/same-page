import React, { useState } from "react"

import Header from "./Header"
import Body from "./Body"
import Footer from "./Footer"
import MusicTab from "containers/Music"

function Chat(props) {
  const [musicDisplay, setMusicDisplay] = useState("block")
  return (
    <div>
      <span style={{ display: musicDisplay }}>
        <MusicTab
          back={() => {
            setMusicDisplay("none")
          }}
        />
      </span>
      <Header
        showMusic={() => {
          setMusicDisplay("block")
        }}
      />
      <Body />
      <Footer />
    </div>
  )
}

export default Chat
