
export function sendMessage(command, args) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(null, { command, args }, {}, resolve)
  })
}

export function escapeHTML(html) {
  return html.replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

let lastElementId = 0
export function generateElementId() {
  return ++lastElementId
}
