import "./Comment.css"

import React from "react"
import { Button, Icon, Input } from "antd"

import axios from "axios"
import moment from "moment"

import urls from "config/urls"
import Header from "./Header"
import Body from "./Body"

const LIMIT = 10

const commentBodyStyle = {
  height: "calc(100% - 100px)",
  overflow: "auto",
  width: "100%",
  position: "fixed",
  background: "#f6f9fc",
  padding: 10,
  paddingBottom: 30
}

const { TextArea } = Input

class CommentTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      submitting: false,
      comments: [],
      input: "",
      inputFocus: false,
      replyTo: null
    }
    this.inputRef = React.createRef()
    this.bodyRef = React.createRef()
    this.offset = 0
    this.order = "best"
  }
  onFocus = e => {
    this.setState({ inputFocus: true })
  }

  reply = (userId, username) => {
    this.setState({ replyTo: username, replyToUserId: userId })
    this.inputRef.current.focus()
  }

  submit = () => {
    const payload = {
      user_id: "123",
      user_name: "David",
      message: this.state.input,
      reply_to_user_id: this.state.replyToUserId,
      reply_to_user_name: this.state.replyTo
    }
    this.setState({ submitting: true })
    axios
      .post(urls.dbAPI + "/db/comments/v2/url/https://www.zhihu.com/", payload)
      .then(res => {
        // TODO: scroll to top
        this.setState({ submitting: false })

        let content = this.state.input
        if (this.state.replyTo) {
          content = "@" + this.state.replyTo + " \n" + content
        }
        const selfMsg = {
          name: "David",
          time: moment().fromNow(),
          content: content,
          self: true
        }
        this.setState({ comments: [selfMsg].concat(this.state.comments) })
        this.clearInput()
        setTimeout(() => {
          console.debug("[Comment] scroll to top")
          this.bodyRef.current.scrollTop = 0
        }, 500)
      })
  }

  handleInput = e => {
    this.setState({ input: e.target.value })
  }
  clearInput = () => {
    this.setState({
      input: "",
      inputFocus: false,
      replyTo: null,
      replyToUserId: null
    })
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
        if (!comment.username) {
          // TODO: backend should return username
          comment.username = comment.name
        }
        if (!comment.userId) {
          // TODO: backend should return camel case userId not user_id
          // should return int id?
          comment.userId = comment.user_id
        }
        if (comment.userId == "123") {
          // TODO: this should be handled by backend
          comment.self = true
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
    let placeholder = "留言。。。"
    if (this.state.replyTo) {
      placeholder = "@" + this.state.replyTo
    }
    return (
      <div>
        <Header orderBy={this.orderBy} />
        <div ref={this.bodyRef} style={commentBodyStyle}>
          {this.state.loading && this.state.comments.length === 0 && (
            <center>
              <Icon type="loading" />
            </center>
          )}
          {(!this.state.loading || this.state.comments.length > 0) && (
            <Body data={this.state.comments} reply={this.reply} />
          )}
          {this.state.comments.length > 0 && (
            <center style={{ marginTop: 20 }}>
              {/* TODO: only if there is more */}
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
        <div className="sp-comment-footer">
          <TextArea
            size="large"
            value={this.state.input}
            onFocus={this.onFocus}
            onChange={this.handleInput}
            placeholder={placeholder}
            rows={rowNum}
            ref={this.inputRef}
          />
          {this.state.inputFocus && (
            <div
              style={{
                width: "100%",
                textAlign: "right"
              }}
            >
              <Button onClick={this.clearInput}>取消</Button>
              <Button
                onClick={this.submit}
                style={{ margin: 10 }}
                type="primary"
                loading={this.state.submitting}
              >
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
