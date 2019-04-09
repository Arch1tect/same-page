import "antd/dist/antd.css"
import "./App.css"

import React, { Component } from "react"
import { Tabs, Icon } from "antd"
import { Provider } from "react-redux"
import { createStore } from "redux"

import Chat from "./Chat/Chat"
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
                <span>
                  <Icon type="message" />
                </span>
              }
              key="1"
            >
              <Chat />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="form" />
                </span>
              }
              key="2"
            >
              Tab 2
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="mail" />
                </span>
              }
              key="3"
            >
              Tab 3
            </TabPane>
            <TabPane tab={<Icon type="user" />} key="4">
              Tab 4
            </TabPane>
          </Tabs>
        </div>
      </Provider>
    )
  }
}

export default App
