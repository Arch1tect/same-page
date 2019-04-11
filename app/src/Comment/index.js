import React from "react"
import axios from "axios"

import urls from "../config/urls"
import Header from "./Header"
import Body from "./Body"

class CommentTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      comments: []
    }
    console.log("construct comment tab")
    axios
      .get(
        "http://localhost:9000/db/comments_with_votes/offset/-1/user_id/c8bf1d88-3ed1-cd9d-8baf-9b1eaad183ee/url/https://www.zhihu.com/"
      )
      .then(res => {
        res.data.forEach(comment => {
          if (comment.has_avatar) {
            comment.avatarSrc = urls.cloudFront + comment.user_id + ".jpg"
          }
        })
        this.setState({ loading: false })
        this.setState({ comments: res.data })
      })
  }

  render() {
    return (
      <div>
        <Header />
        <Body data={this.state.comments} />
      </div>
    )
  }
}

export default CommentTab
