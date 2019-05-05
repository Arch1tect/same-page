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
  // showingFollow is for toggling the Follow view
  // showFollowers is for toggling follower vs following
  const [showingFollow, setShowingFollowState] = useState(false)
  const [showFollowers, setShowFollowersState] = useState(false)
  const backToMainPage = () => {
    // called by the back button
    setResetPasswordState(false)
    setEdittingProfileState(false)
    setShowingFollowState(false)
  }

  // TODO: load account from db every time this tab is mounted

  if (!account) {
    return <Login setAccount={setAccount} />
  }

  return (
    <div>
      {resettingPassword && <ResetPassword back={backToMainPage} />}
      {showingFollow && (
        <Follow
          showFollowers={showFollowers}
          followingCount={account.followingCount}
          followerCount={account.followerCount}
          back={backToMainPage}
        />
      )}
      {edittingProfile && (
        <EditProfile account={account} back={backToMainPage} />
      )}
      <Profile
        account={account}
        showResetPassword={setResetPasswordState}
        showEditProfile={setEdittingProfileState}
        showFollowings={() => {
          setShowingFollowState(true)
          setShowFollowersState(false)
        }}
        showFollowers={() => {
          setShowingFollowState(true)
          setShowFollowersState(true)
        }}
        setAccount={setAccount}
      />
    </div>
  )
}

export default Account
