
(() => {

  const TARGET_QUALITY = 720;

  let episodeId = parseInt(/episode=(\d+)/.exec(location.search)[1])
  if (!episodeId) {
    return
  }
  let contentContainer = document.querySelector('#content')

  sendMessage('fetchEpisode', { episodeId }).then((episode) => {
    return sendMessage('fetchSubsequentEpisodes', {
      episode
    }).then(episodes => [episode, episodes])
  }).then(([episode, nextEpisodes]) => {
    contentContainer.innerHTML = renderEpisode(episode, nextEpisodes.episodes)
  })

  function renderEpisode(episode, nextEpisodes) {
    return `
      <div class="episode-main-content">
        <div class="episode-main-column">
          ${renderPlayer(episode)}
          <p>
            <iframe
                class="episode-description"
                srcdoc="${episode.description.replace(/"/g, '&quot;')}"
                sandbox>
            </iframe>
          </p>
        </div>
        <div class="episode-next-episodes">
         ${nextEpisodes.slice(0, 3).map(episode => renderNextEpisode(episode)).join('')}
        </div>
      </div>
    `
  }

  function renderPlayer(episode) {
    let source = {
      quality: -Infinity
    }
    for (let sourceOption of episode.videoSource) {
      if (
        Math.abs(sourceOption.quality - TARGET_QUALITY) <
        Math.abs(source.quality - TARGET_QUALITY)
      ) {
        source = sourceOption
      }
    }

    return `
      <div class="player">
        <div class="player-sizer" style="padding-top: ${(1 / episode.aspectRatio) * 100}%"></div>
        <video class="player-video" controls autoplay preload="auto">
          <source
              src="${source.source.replace(/"/g, '&quot;')}"
              type="${source.type.replace(/"/g, '&quot;')}">
        </video>
      </div>
    `
  }

  function renderNextEpisode(episode) {
    return `
      <div class="next-episode" data-id="${episode.id}">
        <img
            src="https:${episode.imageUrlTemplate.replace('{width}', 180).replace('{height}', 100)}"
            alt="${episode.title.replace('"', '&quot;')}">
        <h2>${escape(episode.title)}</h2>
      </div>
    `
  }

  function escape(string) {
    let container = document.createElement('span')
    container.appendChild(document.createTextNode(string))
    return container.innerHTML
  }

})()
