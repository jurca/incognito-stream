
class Request {
  /**
   * Sends an HTTP GET request to the specified URL and returns a promise that
   * will resolve to the server's response.
   *
   * @param url
   * @param options
   * @return {Promise<Response>}
   */
  static get(url, options = { headers: {}, body: null }) {
    return new Request('GET', url, options).send()
  }

  /**
   * @param {string} method
   * @param {string} url
   * @param {{
   *          headers: Object<string, string>,
   *          body: ?(boolean|number|string|Object<string, *>|*[])
   *        }} options
   */
  constructor(method, url, options) {
    /**
     * @type {string}
     */
    this.method = method

    /**
     * @type {string}
     */
    this.url = url

    /**
     * @type {Object<string, string>}
     */
    this.headers = options.headers

    /**
     * @type {?(boolean|number|string|Object<string, *>|*[])}
     */
    this.body = options.body

    Object.freeze(this)
  }

  /**
   * @return {Promise<Response>}
   */
  send() {
    return fetch(this.url, this)
  }
}
