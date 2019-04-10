import "antd/dist/antd.css"
import "./iframe.css"

import React from "react"
import { storiesOf } from "@storybook/react"

import ChatBody from "../Chat/Body"
import CommentBody from "../Comment/Body"

import chatMessages from "./data/chats"
import comments from "./data/comments"

storiesOf("Same Page", module)
  .add("Test all", () => (
    <iframe className="sp-chatbox-iframe" src="http://localhost:3000" />
  ))
  .add("Test chat body", () => <ChatBody data={chatMessages} />)
  .add("Test comment body", () => <CommentBody data={comments} />)
