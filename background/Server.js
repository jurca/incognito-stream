
class Server {
  /**
   * @param {Promise<StreamApiClient>} apiClient
   */
  constructor(apiClient) {
    /**
     * @type {Promise<StreamApiClient>}
     */
    this._apiClient = apiClient
  }

  start() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      let cmd = message.command
      let method = `on${cmd.charAt(0).toUpperCase()}${cmd.substring(1)}`

      Promise.resolve(this[method](message.args)).then((response) => {
        sendResponse(response)
      })

      return true
    })
  }

  onFetchEpisodes() {
    return this._apiClient.then(apiClient => apiClient.getNewEpisodes())
  }

  onFetchEpisode({ episodeId }) {
    return this._apiClient.then(apiClient => apiClient.getEpisode(episodeId))
  }

  onFetchSubsequentEpisodes({ episode }) {
    return this._apiClient.then(apiClient => apiClient.getNewEpisodes(episode))
  }
}
