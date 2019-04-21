import React, { useState } from "react"
import Tab from "containers/Tab"
import AccountContext from "context/account-context"

// const defaultAccount = {
//   username: null,
//   userId: null,
//   token: null,
//   password: null,
//   avatarSrc: null
// }

const defaultAccount = {
  username: "King David",
  about: "我就是我，不一样的烟火!",
  userId: 123,
  token: null,
  password: null,
  avatarSrc:
    "https://dnsofx4sf31ab.cloudfront.net/f2a0b5a6-dc6d-423d-52e3-1f5fe3003101.jpg"
}

function App(props) {
  const [account, setAccount] = useState(defaultAccount)

  return (
    <AccountContext.Provider
      value={{ account: account, setAccount: setAccount }}
    >
      <Tab />
    </AccountContext.Provider>
  )
}
export default App
