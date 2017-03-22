
class StreamApiClient {
  /**
   * @param {ApiClient} apiClient
   * @param {string} showsBlacklist
   */
  constructor(apiClient, showsBlacklist) {
    /**
     * @type {ApiClient}
     */
    this._apiClient = apiClient

    /**
     * @type {string[]}
     */
    this._showsBlacklist = showsBlacklist.trim() ?
      showsBlacklist.split(',').map(show => show.trim().toLowerCase())
    :
      []

    Object.freeze(this._showsBlacklist)
    Object.freeze(this)
  }

  /**
   * @param {?{id: number, published: number}} beforeEpisode
   * @return {Promise<{
   *           episodes: {
   *             id: number,
   *             imageUrlTemplate: string,
   *             title: string,
   *             published: number,
   *             show: {
   *               id: number,
   *               imageUrlTemplate: string,
   *               title: string
   *             },
   *             apiLink: string
   *           }[],
   *           nextLink: string
   *         }>}
   */
  getNewEpisodes(beforeEpisode = null) {
    let url = beforeEpisode ?
        `/timeline/latest?timestamp_from=${
          Math.floor(beforeEpisode.published / 1000)
        }&episode_id=${beforeEpisode.id}`:
        '/timeline/latest'
    let blacklist = this._showsBlacklist

    return this._apiClient.get(url).then(responseBody => ({
      episodes: responseBody._embedded['stream:episode'].map(data => ({
        id: data.id,
        imageUrlTemplate: data.image,
        title: data.name,
        published: data.published * 1000,
        show: {
          id: data._embedded['stream:show'].id,
          imageUrlTemplate: data._embedded['stream:show'].image,
          title: data._embedded['stream:show'].name
        },
        apiLink: data._links.self.href
      })).filter(
        episode => !blacklist.includes(episode.show.title.toLowerCase())
      ),
      nextLink: responseBody._links.next.href
    }))
  }

  /**
   * @param {number} id
   * @return {Promise<{
   *           id: number,
   *           aspectRatio: number,
   *           duration: number,
   *           imageUrlTemplate: string,
   *           title: string,
   *           published: number,
   *           videoSource: {
   *             quality: number,
   *             source: string,
   *             type: string
   *           }[],
   *           description: string,
   *           views: number
   *         }>}
   */
  getEpisode(id) {
    return this._apiClient.get(`/episode/${id}`).then(responseBody => ({
      id: responseBody.id,
      aspectRatio: responseBody.aspect_ratio,
      duration: responseBody.duration,
      imageUrlTemplate: responseBody.image,
      title: responseBody.name,
      published: responseBody.published * 1000,
      videoSource: responseBody.video_qualities.map(qualityData => ({
        quality: parseInt(qualityData.formats[0].quality),
        source: qualityData.formats[0].source,
        type: qualityData.formats[0].type
      })),
      description: responseBody.detail,
      views: responseBody.views
    }))
  }
}
