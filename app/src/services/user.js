import axios from "axios"

import urls from "config/urls"

export const getUser = userId => {
  return axios.get(`${urls.dbAPI}/api/v1/user/${userId}`)
}
