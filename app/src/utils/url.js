let _url = window.location.search.substring(1)

export const setUrl = url => {
  _url = url
}

export const getUrl = () => {
  return _url
}

export const getDomain = () => {
  const url = getUrl()
  const parsedUrl = new URL(url)
  return parsedUrl.hostname
}
