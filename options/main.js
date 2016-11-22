
(() => {
  let apiKey = document.querySelector('[name="apiKey"]')
  let incognitoMode = document.querySelector('[name="incognitoMode"]')

  chrome.storage.local.get([
    STORAGE_KEYS.API_KEY,
    STORAGE_KEYS.INCOGNITO
  ], (configuration) => {
    apiKey.value = configuration[STORAGE_KEYS.API_KEY] || ''
    incognitoMode.checked = !!configuration[STORAGE_KEYS.INCOGNITO]
  })

  for (let event of ['keypress', 'blur']) {
    apiKey.addEventListener(event, save)
  }
  for (let event of ['change', 'click']) {
    incognitoMode.addEventListener(event, save)
  }

  let pendingSave = null

  function save() {
    if (pendingSave) {
      pendingSave = this
      return
    }
    pendingSave = this

    let key
    let valueKey
    switch (this) {
      case apiKey:
        key = STORAGE_KEYS.API_KEY
        valueKey = 'value'
        break
      case incognitoMode:
        key = STORAGE_KEYS.INCOGNITO
        valueKey = 'checked'
        break
      default:
        throw new Error('Unknown input', this)
    }
    let value = this[valueKey]

    chrome.storage.local.set({ [key]: value }, () => {
      let shouldProcessPendingSave = (
        (pendingSave !== this) ||
        (pendingSave[valueKey] !== value)
      )
      pendingSave = null
      if (shouldProcessPendingSave) {
        save.call(pendingSave)
      }
    })
  }
})()
