
(() => {

  const TARGET_QUALITY = 720;

  let episodeId = parseInt(/episode=(\d+)/.exec(location.search)[1])
  if (!episodeId) {
    return
  }
  let contentContainer = document.querySelector('#content')

  sendMessage('fetchEpisode', { episodeId }).then((episode) => {
    contentContainer.innerHTML = renderEpisode(episode)
  })

  function renderEpisode(episode) {
    return `
      ${renderPlayer(episode)}
      <p>
        <iframe
            class="episode-description"
            srcdoc="${episode.description.replace(/"/g, '&quot;')}"
            sandbox>
        </iframe>
      </p>
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

})()
