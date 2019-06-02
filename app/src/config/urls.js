import { useLocalAPI, useLocalSocket } from "./index"

const urls = {
  // todo: this should not be in frontend
  // backend should complete url for avatar or any asset
  cloudFront: "https://dnsofx4sf31ab.cloudfront.net/",
  debugMsgSrc: "http://localhost:9009",

  socketAPI: "https://chat.yiyechat.com", // beanstalk
  dbAPI: "https://api-v2.yiyechat.com"
}

if (useLocalAPI) urls.dbAPI = "http://localhost:5000"
if (useLocalSocket) urls.socketAPI = "http://localhost:8081"

export default urls
