
function sendMessage(command, args) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(null, { command, args }, {}, resolve)
  })
}
