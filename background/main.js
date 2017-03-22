
(() => {
  let streamApiClientPromise = new Promise(resolve => {
    chrome.storage.local.get([
      STORAGE_KEYS.API_KEY,
      STORAGE_KEYS.SHOWS_BLACKLIST
    ], configuration => {
      const API_BASE_URL = 'https://www.stream.cz/API'
      const API_KEY = configuration[STORAGE_KEYS.API_KEY]
      const SHOWS_BLACKLIST = configuration[STORAGE_KEYS.SHOWS_BLACKLIST] || ''

      let apiClient = new ApiClient(API_BASE_URL, API_KEY)
      resolve(new StreamApiClient(apiClient, SHOWS_BLACKLIST))
    })
  })

  let server = new Server(streamApiClientPromise)

  server.start()
})()
