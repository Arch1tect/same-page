import "antd/dist/antd.css"
import "./Tab.css"

import React, { useState } from "react"
import { Tabs, Icon, Tooltip } from "antd"
// import { Provider } from "react-redux"
// import { createStore } from "redux"
// import rootReducer from "./reducers"

import Chat from "containers/Chat"
import Comment from "containers/Comment"
import Account from "containers/Account"
import OtherProfile from "containers/OtherProfile"

import TabContext from "context/tab-context"

const TabPane = Tabs.TabPane

// const store = createStore(rootReducer)

function Tab(props) {
  console.log("render tab")

  const [activeTab, changeTab] = useState(props.tab)
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
            key="chat"
          >
            <Chat />
          </TabPane>
          <TabPane
            tab={
              <Tooltip title="留言板" placement="bottom">
                <Icon type="form" />
              </Tooltip>
            }
            key="comment"
          >
            <Comment />
          </TabPane>
          <TabPane
            tab={
              <Tooltip title="收件箱" placement="bottom">
                <Icon type="mail" />
              </Tooltip>
            }
            key="mailbox"
          >
            Tab 3
          </TabPane>
          <TabPane
            tab={
              <Tooltip title="个人信息" placement="bottom">
                <Icon type="user" />
              </Tooltip>
            }
            key="account"
          >
            <Account />
          </TabPane>
        </Tabs>
      </div>
      <OtherProfile data={other} />
    </TabContext.Provider>
  )
}

export default Tab
