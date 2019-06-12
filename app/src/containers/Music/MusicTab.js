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

      <center className="sp-tab-header"> WIP</center>
      <div className="sp-tab-body" style={{ background: "#404040" }}>
        <MusicPlayer />
        <div
          style={{
            padding: 20,
            color: "lightgray",
            width: "100%",
            height: "calc(100% - 270px)",
            position: "fixed",
            overflowX: "hidden",
            overflowY: "auto"
          }}
        >
          <center style={{ marginBottom: 10 }}>播放列表</center>
          <Playlist setMediaNum={props.setMediaNum} />
        </div>
      </div>
    </div>
  )
}

export default MusicTab
