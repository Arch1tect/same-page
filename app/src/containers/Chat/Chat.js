import React, { useState } from "react"

import Header from "./Header"
import Body from "./Body"
import Footer from "./Footer"
import MusicTab from "containers/Music"

function Chat(props) {
  const [mediaDisplay, setMediaDisplay] = useState("block")
  const [mediaNum, setMediaNum] = useState(0)
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
