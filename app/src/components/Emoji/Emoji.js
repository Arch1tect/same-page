import "./Emoji.css"

import React from "react"
import "emoji-mart/css/emoji-mart.css"
import { Picker } from "emoji-mart"

import ClickWrapper from "../OutsideClickDetector"

function Emoji(props) {
  return (
    <ClickWrapper exceptionClass={props.exceptionClass} close={props.close}>
      <Picker onSelect={props.addEmoji} set="apple" showPreview={false} />
    </ClickWrapper>
  )
}
export default Emoji
