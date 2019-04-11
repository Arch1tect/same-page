import React from "react"
import { Select } from "antd"
const Option = Select.Option

function CommentHeader(props) {
  return (
    <center className="sp-tab-header">
      <Select size="small" defaultValue="Yiminghe">
        <Option value="jack">由新到旧</Option>
        <Option value="lucy">由旧到新</Option>
        <Option value="Yiminghe">按好评数</Option>
      </Select>
    </center>
  )
}
export default CommentHeader
