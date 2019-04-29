import React, { useState, useContext } from "react"

import AccountContext from "context/account-context"
import ResetPassword from "./ResetPassword"
import EditProfile from "./EditProfile"
import Profile from "./Profile"
import Follow from "./Follow"
import Login from "containers/Account/Login"

function Account(props) {
  const accountContext = useContext(AccountContext)
  const account = accountContext.account
  const setAccount = accountContext.setAccount

  const [resettingPassword, setResetPasswordState] = useState(false)
  const [edittingProfile, setEdittingProfileState] = useState(false)
  const [showingFollow, setShowingFollowState] = useState(false)
  const backToMainPage = () => {
    // called by the back button
    setResetPasswordState(false)
    setEdittingProfileState(false)
    setShowingFollowState(false)
  }
  if (!account) {
    return <Login setAccount={setAccount} />
  }

  return (
    <div>
      {resettingPassword && <ResetPassword back={backToMainPage} />}
      {showingFollow && <Follow back={backToMainPage} />}
      {edittingProfile && (
        <EditProfile account={account} back={backToMainPage} />
      )}
      <Profile
        account={account}
        showResetPassword={setResetPasswordState}
        showEditProfile={setEdittingProfileState}
        showFollow={setShowingFollowState}
        setAccount={setAccount}
      />
    </div>
  )
}

export default Account
