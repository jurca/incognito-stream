
export function sendMessage(command, args) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(null, { command, args }, {}, resolve)
  })
}

const htmlEscapeHelper = document.createElement('span')

export function escapeHTML(html) {
  htmlEscapeHelper.innerText = html
  return htmlEscapeHelper.innerHTML.replace(/"/g, '&quot;')
}
