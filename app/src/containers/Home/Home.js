import React, { useState } from "react"

import { Collapse } from "antd"

import Danmus from "./Danmus"
import Comments from "./Comments"
import Users from "./Users"
import Rooms from "./Rooms"

const Panel = Collapse.Panel

function Home(props) {
  return (
    <Collapse
      bordered={false}
      className="sp-special-tab"
      defaultActiveKey={["hot-chatrooms"]}
      onChange={key => {}}
    >
      <Panel header="热门聊天室" key="hot-chatrooms">
        <Rooms />
      </Panel>

      <Panel header="最新网页留言" key="latest-comments">
        <Comments />
      </Panel>
      <Panel header="最新视频弹幕" key="latest-danmus">
        <Danmus />
      </Panel>
      <Panel header="新用户" key="new-users">
        <Users />
      </Panel>
    </Collapse>
  )
}

export default Home
