import "./Header.css"

import React, { Component } from "react"
import { Switch, Radio } from "antd"

function togglePageOrSiteChat(e) {
  console.log(e.target.value)
}
function toggleOnline(val) {
  console.log(val)
}

function ChatHeader(props) {
  console.log("render chat header")
  return (
    <div className="sp-tab-header">
      <Switch
        className="sp-toggle-online"
        checkedChildren="在线"
        unCheckedChildren="离线"
        defaultChecked
        onChange={toggleOnline}
      />
      <center>
        <Radio.Group
          className="sp-toggle-page-site-chat"
          size="small"
          defaultValue="a"
          buttonStyle="solid"
          onChange={props.addLiveMsg}
        >
          <Radio.Button value="a">网页</Radio.Button>
          <Radio.Button value="b">网站</Radio.Button>
        </Radio.Group>
      </center>
    </div>
  )
}

export default ChatHeader
