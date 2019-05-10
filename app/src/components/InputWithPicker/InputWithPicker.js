import "./InputWithPicker.css"

import React, { useState, useRef, useEffect } from "react"
import { Icon, Input } from "antd"

import Emoji from "../Emoji"

function InputWithPicker(props) {
  const [input, setInput] = useState("")
  const inputRef = useRef()
  const [showEmoji, setShowEmoji] = useState(false)
  const sending = props.sending
  useEffect(() => {
    if (!sending) {
      inputRef.current.focus()
    }
  }, [sending])
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      setShowEmoji(false)
      const shouldClear = props.send(input)
      if (shouldClear) {
        setInput("")
      }
    }
  }
  const addEmoji = emoji => {
    if (emoji.custom) {
      props.send(emoji.imageUrl)
      setShowEmoji(false)
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
        setShowEmoji(prevState => {
          setShowEmoji(!prevState)
        })
      }}
      type="smile"
    />
  )

  return (
    <div className="sp-input-with-picker">
      {showEmoji && (
        <Emoji
          addEmoji={addEmoji}
          exceptionClass="emojiOpener"
          close={() => {
            setShowEmoji(false)
          }}
        />
      )}

      <Input
        ref={inputRef}
        size="large"
        onKeyDown={handleKeyDown}
        value={input}
        addonBefore={emojiBtn}
        // addonAfter={<Icon type="paper-clip" />}
        onChange={handleChange}
        disabled={sending}
        placeholder={sending ? "发送中。。。" : "请输入。。。"}
      />
    </div>
  )
}

export default InputWithPicker
