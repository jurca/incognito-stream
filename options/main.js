
(() => {
  let apiKey = document.querySelector('[name="apiKey"]')

  apiKey.value = localStorage.getItem(STORAGE_KEYS.API_KEY)

  for (let event of ['keypress', 'blur']) {
    apiKey.addEventListener(event, save)
  }

  function save() {
    localStorage.setItem(STORAGE_KEYS.API_KEY, this.value)
  }
})()
