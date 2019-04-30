import "./Follow.css"
import axios from "axios"

import React, { useEffect, useState, useContext } from "react"
import { Avatar, Icon, Radio, Button } from "antd"

import TabContext from "context/tab-context"
import urls from "config/urls"

function Follow(props) {
  const [showFollowers, setShowFollowers] = useState(props.showFollowers)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [users, setUsers] = useState([])
  const tabContext = useContext(TabContext)

  useEffect(() => {
    setUsers([])
    loadUsers(0)
  }, [showFollowers])

  function shouldShowLoadMoreBtn() {
    // if already loaded users and
    // haven't loaded all users
    if (users.length === 0) return false
    if (showFollowers) {
      return users.length < props.followerCount
    } else {
      return users.length < props.followingCount
    }
  }

  const loadUsers = offset => {
    let url = urls.dbAPI + "/api/v1/"
    if (showFollowers) {
      url += "followers"
    } else {
      url += "followings"
    }
    url += "?offset=" + offset

    if (users.length) {
      setLoadingMore(true)
    }
    axios
      .get(url)
      .then(resp => {
        // Notice we have to call prevUsers rather than
        // just setUsers(users.concat(data)) because
        // update to state is async, it won't work even if the
        // call takes 10 mins to return, it always use the user data
        // when useEffect is called
        setUsers(prevUsers => prevUsers.concat(resp.data))
      })
      .catch(err => {
        console.error(err)
      })
      .then(() => {
        setLoading(false)
        setLoadingMore(false)
      })
  }

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
          defaultValue={showFollowers}
          buttonStyle="solid"
          onChange={e => {
            setShowFollowers(e.target.value)
          }}
        >
          <Radio.Button value={false}>关注了</Radio.Button>
          <Radio.Button value={true}>被关注</Radio.Button>
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
        <center style={{ margin: 20 }}>
          {shouldShowLoadMoreBtn() && (
            <Button
              loading={loadingMore}
              type="primary"
              onClick={() => {
                loadUsers(users.length)
              }}
            >
              加载更多...
            </Button>
          )}
        </center>
      </div>
    </div>
  )
}

export default Follow