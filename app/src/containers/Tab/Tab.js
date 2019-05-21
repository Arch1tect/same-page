import "antd/dist/antd.css"
import "./Tab.css"

import React, { useState } from "react"
import { Tabs, Icon, Tooltip } from "antd"

import Chat from "containers/Chat"
import Comment from "containers/Comment"
import Account from "containers/Account"
import OtherProfile from "containers/OtherProfile"
import Inbox from "containers/Inbox"
import Home from "containers/Home"

import TabContext from "context/tab-context"

const TabPane = Tabs.TabPane

function Tab(props) {
  console.log("render tab")

  const [activeTab, changeTab] = useState(props.tab)
  // view other's profile
  const [other, selectOtherUser] = useState()
  // view direct message with other
  const [conversationUser, setCoversationUser] = useState()
  function directMessage(user) {
    selectOtherUser(null)
    changeTab("inbox")
    setCoversationUser(user)
  }

  return (
    <TabContext.Provider
      value={{
        selectOtherUser: selectOtherUser,
        changeTab: changeTab,
        directMessage: directMessage
      }}
    >
      <div className="card-container">
        <Tabs
          onChange={val => {
            if (val == "minimize") {
              window.parent.postMessage("minimize", "*")
              return
            }
            changeTab(val)
            selectOtherUser(null)
          }}
          activeKey={activeTab}
          type="card"
        >
          <TabPane
            tab={
              <Tooltip title="发现" placement="bottom">
                <Icon type="home" />
              </Tooltip>
            }
            key="home"
          >
            <Home />
          </TabPane>
          <TabPane
            tab={
              <Tooltip title="实时聊天" placement="bottom">
                <Icon type="message" />
              </Tooltip>
            }
            key="chat"
            forceRender={true}
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
            key="inbox"
          >
            <Inbox user={conversationUser} setUser={setCoversationUser} />
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
          <TabPane
            tab={
              <Tooltip title="隐藏聊天盒" placement="bottom">
                <Icon type="close" />
              </Tooltip>
            }
            key="minimize"
          >
            <span>shoud not see this!</span>
          </TabPane>
        </Tabs>
      </div>
      <OtherProfile data={other} selectOtherUser={selectOtherUser} />
    </TabContext.Provider>
  )
}

export default Tab
