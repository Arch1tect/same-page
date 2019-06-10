import React from "react"
import { Button } from "antd"

import MusicPlayer from "components/MusicPlayer"
import Playlist from "./Playlist"

function MusicTab(props) {
  return (
    <div className="sp-special-tab">
      <Button
        onClick={() => {
          props.back()
        }}
        style={{
          position: "fixed",
          marginTop: 1,
          marginLeft: 5,
          border: "none",
          fontSize: "large"
        }}
        icon="arrow-left"
      />

      <center className="sp-tab-header" />

      <div className="sp-tab-body">
        <MusicPlayer />
        <Playlist />
      </div>
    </div>
  )
}

export default MusicTab
