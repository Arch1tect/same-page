import React, { useState, useContext } from "react"
import { Avatar, Icon } from "antd"
import TabContext from "context/TabContext"

import ProfileCard from "./ProfileCard"
import Popper from "@material-ui/core/Popper"

function AvatarWithHoverCard(props) {
  const data = props.data
  const tabContext = useContext(TabContext)
  const [anchorEl, setAnchor] = useState(null)

  const showingCard = Boolean(anchorEl)
  let hideCardTimer = 0
  function hideCard() {
    clearTimeout(hideCardTimer)
    hideCardTimer = setTimeout(() => {
      setAnchor(null)
    }, 300)
  }
  function showCard(el) {
    clearTimeout(hideCardTimer)
    if (el) {
      setAnchor(el)
    }
  }

  return (
    <span>
      <Avatar
        icon="user"
        className={props.className}
        src={data.avatarSrc}
        size={props.size}
        onClick={() => tabContext.selectOtherUser(data)}
        onMouseEnter={e => {
          showCard(e.currentTarget)
        }}
        onMouseLeave={hideCard}
      />

      <Popper
        style={{ zIndex: 10 }}
        onMouseEnter={e => {
          showCard()
        }}
        onMouseLeave={hideCard}
        anchorEl={anchorEl}
        open={showingCard}
      >
        <ProfileCard data={data} />
      </Popper>
    </span>
  )
}

export default AvatarWithHoverCard
