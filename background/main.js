
(() => {
  chrome.storage.local.get(STORAGE_KEYS.API_KEY, (configuration) => {
    const API_BASE_URL = 'https://www.stream.cz/API'
    const API_KEY = configuration[STORAGE_KEYS.API_KEY]

    let apiClient = new ApiClient(API_BASE_URL, API_KEY)
    let streamApiClient = new StreamApiClient(apiClient)
    let server = new Server(streamApiClient)

    server.start()
  })
})()
