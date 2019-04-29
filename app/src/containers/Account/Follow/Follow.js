import "./Follow.css"
import axios from "axios"

import React, { useEffect, useState, useContext } from "react"
import { Avatar, Icon, Radio, Button } from "antd"

import TabContext from "context/tab-context"
import urls from "config/urls"

// const TabPane = Tabs.TabPane

function Follow(props) {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const tabContext = useContext(TabContext)

  useEffect(() => {
    axios
      .get(urls.dbAPI + "/api/v1/followers")
      .then(resp => {
        setUsers(resp.data)
      })
      .catch(err => {
        console.error(err)
      })
      .then(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="sp-follow-tab">
      <Button
        onClick={props.back}
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
          className="sp-toggle-page-site-chat"
          size="small"
          defaultValue="a"
          buttonStyle="solid"
          // onChange={props.addLiveMsg}
        >
          <Radio.Button value="b">关注了</Radio.Button>
          <Radio.Button value="a">被关注</Radio.Button>
        </Radio.Group>
      </center>
      <div className="sp-follow-body">
        {loading && (
          <center>
            <Icon
              style={{
                marginTop: 10,
                border: "none",
                fontSize: "large"
              }}
              type="loading"
            />
          </center>
        )}

        {users.map(user => (
          <div
            onClick={() => tabContext.selectOtherUser(user)}
            className="sp-follow-row"
            key={user.id}
          >
            <Avatar icon="user" src={user.avatarSrc} />
            {user.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Follow
