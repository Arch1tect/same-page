import "antd/dist/antd.css";
import './App.css';

import React, { Component } from 'react'
import { Tabs, Icon } from 'antd'

const TabPane = Tabs.TabPane;


class App extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="2">
        <TabPane tab={<span><Icon type="message" /></span>} key="1">
          Tab 1
        </TabPane>
        <TabPane tab={<span><Icon type="edit" /></span>} key="2">
          Tab 2
        </TabPane>
        <TabPane tab={<span><Icon type="mail" /></span>} key="3">
          Tab 3
        </TabPane>
        <TabPane tab={<span><Icon type="user" /></span>} key="4">
          Tab 4
        </TabPane>
      </Tabs>
    );
  }
}

export default App;
