import {sendMessage} from '../utils.js'
import playerTemplate from './ui/player.js'
import episodeLinkTemplate from './ui/episodeLink.js'

(async () => {

  const TARGET_QUALITY = 720;

  let episodeId = parseInt(/episode=(\d+)/.exec(location.search)[1])
  if (!episodeId) {
    return
  }
  let contentContainer = document.querySelector('#content')

  const episode = await sendMessage('fetchEpisode', { episodeId })
  const nextEpisodes = await sendMessage('fetchSubsequentEpisodes', { episode })

  contentContainer.innerHTML = renderEpisode(episode, nextEpisodes.episodes)
  document.title = `${episode.title} | Incognito Stream.cz`

  let iframe = contentContainer.querySelector('iframe.episode-description')

  setTimeout(() => {
    requestAnimationFrame(() => {
      let height = iframe.contentDocument.documentElement.scrollHeight
      iframe.style.height = `${height}px`
    })
  }, 500)

  addEventListener('click', (event) => {
    let target = event.target
    while (target && (!target.hasAttribute || !target.hasAttribute('data-id'))) {
      target = target.parentNode
    }
    if (!target) {
      return
    }

    let episodeId = parseInt(target.getAttribute('data-id'))
    navigateToEpisode(episodeId)
  })

  function navigateToEpisode(episodeId) {
    let url = chrome.runtime.getURL(
      `episode/episode.html?episode=${episodeId}`
    )
    location.href = url;
  }

  function renderEpisode(episode, nextEpisodes) {
    return `
      <div class="episode-main-content">
        <div class="episode-main-column">
          ${playerTemplate(episode)}
          <p>
            <iframe
                class="episode-description"
                srcdoc="<h1>${escape(episode.title).replace(/"/g, '&quot;')}</h1>${episode.description.replace(/"/g, '&quot;')}"
                sandbox="allow-same-origin">
            </iframe>
          </p>
        </div>
        <div class="episode-next-episodes">
          ${nextEpisodes.slice(0, 3).map(episode => episodeLinkTemplate({
            ...episode,
            imageUrl: `https:${episode.imageUrlTemplate.replace('{width}', 180).replace('{height}', 100)}`  
          })).join('')}
        </div>
      </div>
    `
  }

  function escape(string) {
    let container = document.createElement('span')
    container.appendChild(document.createTextNode(string))
    return container.innerHTML
  }

})()
