parent.postMessage(JSON.stringify({
  elementId: Array.from(document.querySelectorAll('[data-elm-id]')).pop().dataset.elmId,
  contentHeight: document.documentElement.scrollHeight
}), '*')
