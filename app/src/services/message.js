import axios from "axios"

import urls from "config/urls"

export const getMessages = () => {
  return axios.get(`${urls.dbAPI}/api/v1/messages`)
}
