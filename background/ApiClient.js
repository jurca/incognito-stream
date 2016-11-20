
class ApiClient {
  /**
   * @param {string} baseUrl
   * @param {string} apiKey
   */
  constructor(baseUrl, apiKey) {
    this._baseUrl = baseUrl
    Object.defineProperty(this, '_baseUrl', {
      configurable: false,
      writable: false
    })

    this._apiKey = apiKey
    Object.defineProperty(this, '_apiKey', {
      configurable: false,
      writable: false
    })

    this._now = null
    Object.defineProperty(this, '_now', {
      configurable: false
    })

    Object.seal(this)
  }

  /**
   *
   * @param {string} url
   * @param {{
   *          headers: Object<string, string>=,
   *          body: ?(boolean|number|string|Object<string, *>|*[])=
   *        }} options
   * @return {Promise<*>}
   */
  get(url, options = {}) {
    let timestamp = this._now || Math.round(Date.now() / (24 * 60 * 60 * 1000))
    let requestDescriptor = [this._apiKey, url, timestamp]
    let signature = md5(requestDescriptor.join(''))

    let requestOptions = JSON.parse(JSON.stringify(options))
    requestOptions.headers = requestOptions.headers || {}
    requestOptions.headers['Api-Password'] = signature
    return Request.get(this._baseUrl + url, requestOptions).then(response => {
      this._now = response.headers['Now']
      return response.json()
    })
  }
}
