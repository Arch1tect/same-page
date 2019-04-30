import React from "react"
import { Button, Avatar, Card } from "antd"

const { Meta } = Card

function ProfileCard(props) {
  const basicUser = {
    avatarSrc: props.data.avatarSrc,
    name: props.data.name
  }
  console.log("card")
  console.log(props)
  const user = basicUser
  // const [user, setUser] = useState(basicUser)
  // const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   axios.get(urls.dbAPI + "/db/user/" + props.data.userId).then(resp => {
  //     console.log(resp.data)
  //     if (resp.data.length) {
  //       // Todo: backend should return just 1
  //       const data = resp.data[0]
  //       user.name = data.name
  //       user.userId = data.id
  //       user.about = data.about
  //       user.followers = data.followers.length
  //       user.followings = data.followings.length
  //       setUser({ ...user })
  //       setLoading(false)
  //     }
  //   })
  // }, [])
  // TODO: missing useEffect cleanup

  const footer = (
    <div>
      {/* <div style={{ fontSize: "small", fontWeight: "bold", marginBottom: 10 }}>
        关注者: {user.followers}
      </div>
      <div style={{ marginBottom: 10 }}>{user.about}</div> */}

      <Button type="primary" icon="user-add" size="small">
        关注
      </Button>
      <Button icon="mail" style={{ margin: 5 }} size="small">
        私信
      </Button>
    </div>
  )

  return (
    <Card size="small" style={{ width: 250 }}>
      <Meta
        avatar={<Avatar size={48} src={user.avatarSrc} icon="user" />}
        title={user.name}
        description={footer}
      />
    </Card>
  )
}
export default ProfileCard