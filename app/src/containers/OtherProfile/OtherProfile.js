import React, { useContext } from "react"
import { Button } from "antd"

import TabContext from "context/tab-context"
import ProfileMeta from "./ProfileMeta"
import PrfileBody from "./ProfileBody"

function OtherProfile(props) {
  if (!props.data) return <span />
  const tabContext = useContext(TabContext)

  const user = {
    avatarSrc: props.data.avatarSrc,
    name: props.data.name,
    id: props.data.userId || props.data.id
  }

  return (
    <div className="sp-special-tab">
      <Button
        onClick={() => tabContext.selectOtherUser()}
        style={{
          position: "fixed",
          marginTop: 1,
          marginLeft: 5,
          border: "none",
          fontSize: "large"
        }}
        icon="arrow-left"
      />
      <ProfileMeta user={user}>
        <PrfileBody />
      </ProfileMeta>
    </div>
  )
}

export default OtherProfile
