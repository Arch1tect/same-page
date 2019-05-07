import axios from "axios"

import urls from "config/urls"

export const getAccount = () => {
  return axios.get(`${urls.dbAPI}/api/v1/account`)
}

export const login = (userId, password) => {
  const payload = {
    userId: userId,
    password: password
  }
  return axios.post(urls.dbAPI + "/api/v1/login", payload)
}

export const logout = () => {
  return axios.post(urls.dbAPI + "/api/v1/logout")
}