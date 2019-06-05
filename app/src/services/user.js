import axios from "axios"

import urls from "config/urls"

const _userCache = {} // id -> user data mapping
// only use case of this cache is
// caching user data of users in a chatroom
// so that we can lookup user data when a user
// send a message in the chatroom
export const addUserToCache = user => {
  _userCache[user.id] = user
}
export const getUserFromCache = userId => {
  // shouldn't ever be cache miss if only above use case
  return _userCache[userId]
}

export const getUser = userId => {
  return axios.get(`${urls.dbAPI}/api/v1/user/${userId}`)
}

export const getLatestUsers = () => {
  return axios.get(`${urls.dbAPI}/api/v1/latest_users`)
}

export const updateUser = payload => {
  const formData = new FormData()
  formData.append("name", payload.name)
  formData.append("about", payload.about)
  if (payload.avatar) {
    formData.append("avatar", payload.avatar, "avatar")
  }
  return axios.post(urls.dbAPI + "/api/v1/user", formData)
}
