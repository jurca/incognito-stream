
(() => {
  let apiKey = document.querySelector('[name="apiKey"]')
  let incognitoMode = document.querySelector('[name="incognitoMode"]')
  let showsBlacklist = document.querySelector('[name="showsBlacklist"]')

  chrome.storage.local.get([
    STORAGE_KEYS.API_KEY,
    STORAGE_KEYS.INCOGNITO,
    STORAGE_KEYS.SHOWS_BLACKLIST,
  ], configuration => {
    apiKey.value = configuration[STORAGE_KEYS.API_KEY] || ''
    incognitoMode.checked = !!configuration[STORAGE_KEYS.INCOGNITO]
    showsBlacklist.value = configuration[STORAGE_KEYS.SHOWS_BLACKLIST] || ''
  })

  for (let event of ['keypress', 'blur']) {
    apiKey.addEventListener(event, () => save(apiKey))
  }
  for (let event of ['change', 'click']) {
    incognitoMode.addEventListener(event, () => save(incognitoMode))
  }
  for (let event of ['keypress', 'blur']) {
    showsBlacklist.addEventListener(event, () => save(showsBlacklist))
  }

  let pendingSave = null

  function save(modifiedInput) {
    if (pendingSave) {
      pendingSave = modifiedInput
      return
    }
    pendingSave = modifiedInput

    let key
    let valueKey
    switch (modifiedInput) {
      case apiKey:
        key = STORAGE_KEYS.API_KEY
        valueKey = 'value'
        break
      case incognitoMode:
        key = STORAGE_KEYS.INCOGNITO
        valueKey = 'checked'
        break
      case showsBlacklist:
        key = STORAGE_KEYS.SHOWS_BLACKLIST
        valueKey = 'value'
        break
      default:
        throw new Error('Unknown input', modifiedInput)
    }
    let value = modifiedInput[valueKey]

    chrome.storage.local.set({ [key]: value }, () => {
      let shouldProcessPendingSave = (
        (pendingSave !== modifiedInput) ||
        (pendingSave[valueKey] !== value)
      )
      pendingSave = null
      if (shouldProcessPendingSave) {
        save.call(pendingSave)
      }
    })
  }
})()
