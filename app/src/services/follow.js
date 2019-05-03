import axios from "axios"

import urls from "config/urls"

export const followUser = uuid => {
  const payload = {
    uuid: uuid
  }
  return axios.post(`${urls.dbAPI}/api/v1/follow`, payload)
}
