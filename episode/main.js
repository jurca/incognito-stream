import {sendMessage} from '../utils.js'
import playerTemplate from './ui/player.js'
import episodeLinkTemplate from './ui/episodeLink.js'
import richContentTemplate, {registerRichContentElement} from './ui/richContent.js'

(async () => {

  let episodeId = parseInt(/episode=(\d+)/.exec(location.search)[1])
  if (!episodeId) {
    return
  }
  let contentContainer = document.querySelector('#content')

  const episode = await sendMessage('fetchEpisode', { episodeId })
  const nextEpisodes = await sendMessage('fetchSubsequentEpisodes', { episode })

  contentContainer.innerHTML = renderEpisode(episode, nextEpisodes.episodes)
  document.title = `${episode.title} | Incognito Stream.cz`

  registerRichContentElement()

  function renderEpisode(episode, nextEpisodes) {
    return `
      <div class="episode-main-content">
        <div class="episode-main-column">
          ${playerTemplate(episode)}
          <p>
            ${richContentTemplate(`<h1>${episode.title}</h1>${episode.description}`)}
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
