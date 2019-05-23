import React, { useState } from "react"

import { Collapse } from "antd"

import Comments from "./Comments"
import Users from "./Users"

const Panel = Collapse.Panel
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  Known for its loyalty and faithfulness,
  Known for its loyalty and faithfulness,
  Known for its loyalty and faithfulness,
  Known for its loyalty and faithfulness,
  Known for its loyalty and faithfulness,
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`
function Home(props) {
  return (
    <Collapse
      bordered={false}
      className="sp-special-tab"
      defaultActiveKey={["hot-chatrooms", "hot-danmus"]}
      onChange={key => {}}
    >
      <Panel header="热门聊天室" key="hot-chatrooms">
        {/* <p>{text}</p> */}
      </Panel>
      <Panel header="热门视频弹幕" key="hot-danmus">
        {/* <p>{text}</p> */}
      </Panel>
      <Panel header="最新留言" key="latest-comments">
        <Comments />
      </Panel>
      <Panel header="新用户" key="new-users">
        <Users />
      </Panel>
    </Collapse>
  )
}

export default Home
