import "antd/dist/antd.css"
import "./App.css"

import React, { Component } from "react"
import { Tabs, Icon, Tooltip } from "antd"
import { Provider } from "react-redux"
import { createStore } from "redux"

import Chat from "./Chat"
import Comment from "./Comment"
import rootReducer from "./reducers"

const TabPane = Tabs.TabPane

const store = createStore(rootReducer)

class App extends Component {
  render() {
    console.log("render app")
    return (
      <Provider store={store}>
        <div className="card-container">
          <Tabs defaultActiveKey="1" type="card">
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
              Tab 4
            </TabPane>
          </Tabs>
        </div>
      </Provider>
    )
  }
}

export default App
