import React, { useState, useEffect, useContext, useRef } from "react"
import moment from "moment"

import Message from "./Message"
import { socketHandler } from "socket/socket"
import AccountContext from "context/account-context"
import { getUserFromCache } from "services/user"

const chatBodyStyle = {
  height: "calc(100% - 107px)",
  overflowY: "auto",
  overflowX: "hidden",
  width: "100%",
  position: "fixed",
  background: "#f6f9fc",
  padding: 10,
  paddingBottom: 50
}
const AUTO_SCROLL_TRESHOLD_DISTANCE = 300

function ChatBody(props) {
  const [messages, setMessages] = useState(props.data || [])
  const bodyRef = useRef(null)
  const accountContext = useContext(AccountContext)

  useEffect(() => {
    window.setPlaylist(
      messages.filter(msg => {
        return msg.type === "audio" || msg.type === "video"
      })
    )
  }, [messages])
  useEffect(() => {
    socketHandler.onLiveMsg = data => {
      // message event doesn't contain user data
      // but we should have it in cache when knowing
      // who are in the chatroom
      data.self =
        data.userId.toString() === accountContext.account.id.toString()
      const user = getUserFromCache(data.userId)
      data.user = user
      window.parent.postMessage({ ...data, danmu: true }, "*")
      data.time = moment()
      setMessages(prevMessages => {
        return [...prevMessages, data]
      })
      let timeout = 10
      if (data.type === "sticker") timeout = 500
      if (data.type === "image") timeout = 700
      // TODO: use onload event rather than hard code time
      scrollToBottomIfNearBottom(timeout)
    }
    socketHandler.onRoomChangeCallbacks.push(roomId => {
      setMessages([])
    })
    socketHandler.onRecentMessages = recentMessages => {
      // Receive recent messages of the joined room,
      // should receive right after joining room.
      // Shoudn't display recent messages if there's
      // any messages already being displayed, e.g. joined
      // the room then went offline then back online
      recentMessages.forEach(msg => {
        msg.self =
          msg.userId.toString() === accountContext.account.id.toString()
        msg.time = moment.utc(msg.timestamp)
      })
      setMessages(recentMessages)
    }
  }, [])

  const scrollToBottomIfNearBottom = timeout => {
    timeout = timeout || 100
    const bodyDiv = bodyRef.current
    if (
      bodyDiv.scrollHeight - bodyDiv.scrollTop - bodyDiv.offsetHeight <
      AUTO_SCROLL_TRESHOLD_DISTANCE
    ) {
      setTimeout(() => {
        bodyDiv.scrollTop = bodyDiv.scrollHeight
      }, timeout)
    }
  }

  let res = []
  let lastMsg = null
  let index = 0

  messages.forEach(msg => {
    // If same user is talking, no need to show user's avatar again
    let showUser = true
    // If it's been more than 5 mins since last msg
    let showTimestamp = false
    let timeDisplay = null

    if (lastMsg) {
      if (lastMsg.userId.toString() === msg.userId.toString()) showUser = false
      if (msg.time.diff(lastMsg.time) > 5 * 60 * 1000) {
        showTimestamp = true
        showUser = true
      }
    } else {
      showTimestamp = true
      showUser = true
    }

    if (showTimestamp) {
      if (moment().diff(msg.time) > 24 * 60 * 60 * 1000)
        timeDisplay = msg.time.local().format("MMMDo A HH:mm")
      else timeDisplay = msg.time.local().format("A HH:mm")
    }

    res.push(
      <Message
        withHoverCard={true}
        key={index++}
        data={msg}
        showUser={showUser}
        timeDisplay={timeDisplay}
        displayMusicTab={props.displayMusicTab}
      />
    )
    lastMsg = msg
  })
  return (
    <div ref={bodyRef} style={chatBodyStyle}>
      {res}
    </div>
  )
}

export default ChatBody
