import "./InputWithPicker.css"

import React, { useState, useRef, useEffect } from "react"
import { Icon, Input } from "antd"

import Emoji from "../Emoji"

function InputWithPicker(props) {
  const [input, setInput] = useState("")
  const inputRef = useRef()
  // show emoji is one step slower than will show emoji
  // so that we can show a loading icon
  const [showEmoji, setShowEmoji] = useState(false)
  const [willShowEmoji, setWillShowEmoji] = useState(false)

  const sending = props.sending
  const autoFocus = props.autoFocus || false
  useEffect(() => {
    if (autoFocus) {
      inputRef.current.focus()
    }
  }, [sending, autoFocus])

  useEffect(() => {
    setShowEmoji(willShowEmoji)
  }, [willShowEmoji])

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      setWillShowEmoji(false)
      const shouldClear = props.send(input)
      if (shouldClear) {
        setInput("")
      }
    }
  }
  const addEmoji = emoji => {
    if (emoji.custom) {
      props.send(emoji.imageUrl)
      setWillShowEmoji(false)
    } else {
      setInput(input => {
        return input + emoji.native
      })
    }
    inputRef.current.focus()
  }
  const handleChange = e => {
    setInput(e.target.value)
  }

  const emojiBtn = (
    <Icon
      className="emojiOpener"
      onClick={e => {
        setWillShowEmoji(prevState => {
          setWillShowEmoji(!prevState)
        })
      }}
      type="smile"
    />
  )

  return (
    <div className="sp-input-with-picker">
      {willShowEmoji && <Icon style={{ margin: 10 }} type="loading" />}
      {showEmoji && (
        <Emoji
          addEmoji={addEmoji}
          exceptionClass="emojiOpener"
          close={() => {
            setWillShowEmoji(false)
          }}
        />
      )}
      <Input
        ref={inputRef}
        size="large"
        onKeyDown={handleKeyDown}
        value={input}
        addonBefore={emojiBtn}
        addonAfter={props.addonAfter}
        onChange={handleChange}
        disabled={sending}
        placeholder={sending ? "发送中。。。" : "请输入。。。"}
      />
    </div>
  )
}

export default InputWithPicker
