const _socketEventHanders = {}

const socketManager = {
  addHandler: (eventName, callbackName, callback) => {
    const handlers = _socketEventHanders[eventName] || {}
    handlers[callbackName] = callback
    _socketEventHanders[eventName] = handlers
  },
  removeHandler: (eventName, callbackName) => {
    const handlers = _socketEventHanders[eventName]
    delete handlers[callbackName]
  },
  sendMessage: msg => {
    window.parent.postMessage(
      { type: "sp-socket", msg: msg, action: "send message" },
      "*"
    )
  },
  sendEvent: (eventName, data) => {
    window.parent.postMessage(
      {
        type: "sp-socket",
        data: data,
        eventName: eventName,
        action: "send event"
      },
      "*"
    )
  },
  changeRoom: roomId => {
    window.parent.postMessage(
      { type: "sp-socket", roomId: roomId, action: "change room" },
      "*"
    )
  }
}

export default socketManager

window.addEventListener(
  "message",
  e => {
    if (e && e.data && e.data.type === "sp-socket") {
      const eventName = e.data.name
      const data = e.data.data
      if (eventName in _socketEventHanders) {
        const handlers = _socketEventHanders[eventName] || {}
        Object.values(handlers).forEach(handler => {
          handler(data)
        })
      }
    }
  },
  false
)
