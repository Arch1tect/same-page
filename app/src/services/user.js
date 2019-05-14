import axios from "axios"

import urls from "config/urls"

export const getUser = userId => {
  return axios.get(`${urls.dbAPI}/api/v1/user/${userId}`)
}

export const updateUser = payload => {
  const formData = new FormData()
  formData.append("name", payload.name)
  formData.append("about", payload.about)
  formData.append("avatar", payload.avatar, "avatar")
  return axios.post(urls.dbAPI + "/api/v1/user", formData)
}
