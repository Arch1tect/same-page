import React from "react"
import { Button, Input } from "antd"

import axios from "axios"
import moment from "moment"

import urls from "../config/urls"
import Header from "./Header"
import Body from "./Body"

const LIMIT = 10
const commentBodyStyle = {
  height: "calc(100% - 100px)",
  overflow: "auto",
  width: "100%",
  position: "fixed",
  background: "#eceff1",
  padding: 10,
  paddingBottom: 30
}
const commentFooterStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  background: "#eceff1"
}

const { TextArea } = Input

class CommentTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      comments: [],
      input: "",
      inputFocus: false
    }
    this.offset = 0
    this.order = "best"
  }
  onFocus = e => {
    this.setState({ inputFocus: true })
  }

  reply = () => {
    this.setState({ inputFocus: true })
  }

  handleInput = e => {
    this.setState({ input: e.target.value })
  }
  clearInput = () => {
    console.log("clear input")
    this.setState({ input: "", inputFocus: false })
  }
  orderBy = val => {
    this.setState({ comments: [] })
    this.offset = 0
    this.order = val
    this.loadComments()
  }

  loadMore = () => {
    this.offset = this.state.comments.length
    this.loadComments()
  }

  loadComments = () => {
    this.setState({ loading: true })
    const payload = {
      userId: "123",
      url: "https://www.zhihu.com/",
      offset: this.offset,
      limit: LIMIT,
      order: this.order
    }
    axios.post("http://localhost:9000/db/comments", payload).then(res => {
      res.data.forEach(comment => {
        if (comment.has_avatar) {
          comment.avatarSrc = urls.cloudFront + comment.user_id + ".jpg"
        }
        comment.time = moment.utc(comment.created_time).fromNow()
      })
      this.setState({ loading: false })
      this.setState({ comments: this.state.comments.concat(res.data) })
    })
  }
  componentDidMount() {
    this.loadComments()
  }

  render() {
    let rowNum = 1
    if (this.state.inputFocus) {
      rowNum = 5
    }
    return (
      <div>
        <Header orderBy={this.orderBy} />
        <div style={commentBodyStyle}>
          {this.state.loading && this.state.comments.length === 0 && (
            <center>Loading...</center>
          )}
          {(!this.state.loading || this.state.comments.length > 0) && (
            <Body data={this.state.comments} reply={this.reply} />
          )}
          {this.state.comments.length > 0 && (
            <center style={{ marginTop: 20 }}>
              <Button
                loading={this.state.loading}
                type="primary"
                onClick={this.loadMore}
              >
                加载更多...
              </Button>
            </center>
          )}
        </div>
        <div style={commentFooterStyle}>
          <TextArea
            size="large"
            value={this.state.input}
            onFocus={this.onFocus}
            onChange={this.handleInput}
            placeholder="留言。。。"
            rows={rowNum}
          />
          {this.state.inputFocus && (
            <div
              style={{
                width: "100%",
                textAlign: "right"
              }}
            >
              <Button onClick={this.clearInput}>取消</Button>
              <Button style={{ margin: 10 }} type="primary">
                提交
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default CommentTab
