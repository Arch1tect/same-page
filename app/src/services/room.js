import axios from "axios"

import urls from "config/urls"

export const getPopularRooms = () => {
  return axios.get(`${urls.socketAPI}/api/popular_rooms`)
}
