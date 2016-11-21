
(() => {
  let apiKey = document.querySelector('[name="apiKey"]')
  let incognitoMode = document.querySelector('[name="incognitoMode"]')

  apiKey.value = localStorage.getItem(STORAGE_KEYS.API_KEY)
  incognitoMode.checked = !!localStorage.getItem(STORAGE_KEYS.INCOGNITO)

  for (let event of ['keypress', 'blur']) {
    apiKey.addEventListener(event, save)
  }
  for (let event of ['change', 'click']) {
    incognitoMode.addEventListener(event, save)
  }

  function save() {
    let key
    let value
    switch (this) {
      case apiKey:
        key = STORAGE_KEYS.API_KEY
        value = this.value
        break
      case incognitoMode:
        key = STORAGE_KEYS.INCOGNITO
        value = this.checked ? '1' : ''
        break
      default:
        throw new Error('Unknown input', this)
    }

    localStorage.setItem(key, value)
  }
})()
