import {sendMessage} from '../utils.js'
import episodeTemplate from './ui/episode.js'
import {registerRichContentElement} from './ui/richContent.js'

(async () => {
  let episodeId = parseInt(/episode=(\d+)/.exec(location.search)[1])
  if (!episodeId) {
    return
  }
  let contentContainer = document.querySelector('#content')
  registerRichContentElement()

  const episode = await sendMessage('fetchEpisode', { episodeId })
  const nextEpisodes = await sendMessage('fetchSubsequentEpisodes', { episode })

  contentContainer.innerHTML = episodeTemplate({
    ...episode,
    nextEpisodes: nextEpisodes.episodes,
  })
  document.title = `${episode.title} | Incognito Stream.cz`
})()
