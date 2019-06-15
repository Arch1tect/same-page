import React, { useState } from "react"
import { Button, Radio } from "antd"

import MusicPlayer from "components/MusicPlayer"
import Playlist from "./Playlist"

function MusicTab(props) {
  const [loopMode, setLoopMode] = useState("loopAll")
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

      <center className="sp-tab-header">
        <Radio.Group
          size="small"
          buttonStyle="solid"
          value={loopMode}
          onChange={e => {
            setLoopMode(e.target.value)
          }}
        >
          <Radio.Button value="loopCurrent">循环当前</Radio.Button>
          <Radio.Button value="loopAll">循环列表</Radio.Button>
        </Radio.Group>
      </center>
      <div className="sp-tab-body" style={{ background: "#404040" }}>
        <MusicPlayer />
        <div
          style={{
            padding: 20,
            color: "lightgray",
            width: "100%",
            height: "180px",
            fontSize: "10px",
            position: "fixed",
            overflowX: "hidden",
            overflowY: "auto"
          }}
        >
          <center style={{ marginBottom: 10 }}>播放列表</center>
          <Playlist setMediaNum={props.setMediaNum} loopMode={loopMode} />
        </div>
      </div>
    </div>
  )
}

export default MusicTab
