import { useLocalAPI } from "./index"

const urls = {
  debugMsgSrc: "http://localhost:9009",
  dbAPI: "https://api-v2.yiyechat.com",
  // used to get pop rooms
  socketAPI: "https://chat.yiyechat.com"
}

if (useLocalAPI) urls.dbAPI = "http://localhost:5000"

export default urls
