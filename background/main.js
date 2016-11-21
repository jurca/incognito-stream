
(() => {
  const API_BASE_URL = 'https://www.stream.cz/API'
  const API_KEY = localStorage.getItem(STORAGE_KEYS.API_KEY)

  let apiClient = new ApiClient(API_BASE_URL, API_KEY)
  let streamApiClient = new StreamApiClient(apiClient)
  let server = new Server(streamApiClient)

  server.start()
})()
