import "antd/dist/antd.css"
import "./App.css"

import React, { useState } from "react"
import { Tabs, Icon, Tooltip } from "antd"
// import { Provider } from "react-redux"
// import { createStore } from "redux"
// import rootReducer from "./reducers"

import Chat from "./Chat"
import Comment from "./Comment"
import Profile from "./Profile"
import OtherProfile from "./Profile/OtherProfile"
import TabContext from "./context/TabContext"

const TabPane = Tabs.TabPane

// const store = createStore(rootReducer)

function App(props) {
  console.log("render app")
  const [activeTab, changeTab] = useState("1")
  const [other, selectOtherUser] = useState()

  return (
    <TabContext.Provider value={{ selectOtherUser: selectOtherUser }}>
      <div className="card-container">
        <Tabs
          onChange={val => {
            changeTab(val)
            selectOtherUser(null)
          }}
          activeKey={activeTab}
          type="card"
        >
          <TabPane
            tab={
              <Tooltip title="实时聊天" placement="bottom">
                <Icon type="message" />
              </Tooltip>
            }
            key="1"
          >
            <Chat />
          </TabPane>
          <TabPane
            tab={
              <Tooltip title="留言板" placement="bottom">
                <Icon type="form" />
              </Tooltip>
            }
            key="2"
          >
            <Comment />
          </TabPane>
          <TabPane
            tab={
              <Tooltip title="收件箱" placement="bottom">
                <Icon type="mail" />
              </Tooltip>
            }
            key="3"
          >
            Tab 3
          </TabPane>
          <TabPane
            tab={
              <Tooltip title="个人信息" placement="bottom">
                <Icon type="user" />
              </Tooltip>
            }
            key="4"
          >
            <Profile />
          </TabPane>
        </Tabs>
      </div>
      <OtherProfile data={other} />
    </TabContext.Provider>
  )
}

export default App
