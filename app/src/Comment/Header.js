import React from "react"
import { Select } from "antd"
const Option = Select.Option

function CommentHeader(props) {
  return (
    <center className="sp-tab-header">
      <Select onChange={props.orderBy} size="small" defaultValue="best">
        <Option value="newest">按时间排序</Option>
        <Option value="best">按好评排序</Option>
      </Select>
    </center>
  )
}
export default CommentHeader
