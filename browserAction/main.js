
(() => {

  let content = document.querySelector('#content')
  sendMessage('fetchEpisodes').then((response) => {
    content.innerHTML = renderEpisodes(response.episodes)
  })

  addEventListener('click', (event) => {
    let target = event.target
    while (target && !target.hasAttribute('data-id')) {
      target = target.parentNode
    }
    if (!target) {
      return
    }

    let episodeId = parseInt(target.getAttribute('data-id'))
    openEpisode(episodeId)
  })

  function openEpisode(episodeId) {
    chrome.windows.getAll({ windowTypes: ['normal'] }, (windows) => {
      // note: the returned windows do not include the incognito windows for
      // some reason
      let windowToUse
      for (let window of windows) {
        if (
          window.focused &&
          window.incognito &&
          !['minimized', 'docked'].includes(window.state)
        ) {
          windowToUse = window
          break
        }
      }
      if (!windowToUse) {
        for (let window of windows) {
          if (
            window.incognito &&
            !['minimized', 'docked'].includes(window.state)
          ) {
            windowToUse = window
            break
          }
        }
      }
      if (!windowToUse) {
        for (let window of windows) {
          if (window.incognito) {
            windowToUse = window
            break
          }
        }
      }

      let url = chrome.runtime.getURL(
        '../episode/episode.html?episode=' + episodeId
      )
      /* the following does not work properly, yet
      if (windowToUse) {
        chrome.tabs.create({
          windowId: windowToUse.id,
          url
        })
        chrome.windows.update(windowToUse.id, {
          focused: true
        })
      } {*/
        chrome.windows.create({
          url,
          focused: true,
          incognito: true
        })
      //}
    })
  }

  function renderEpisodes(episodes) {
    return `
      <ul class="episode-list">
        ${episodes.map(episode => `
          <li class="episode-list-item">
            ${renderEpisode(episode)}
          </li>
        `).join('')}
      </ul>
    `
  }

  function renderEpisode(episode) {
    return `
      <div class="episode" data-id="${episode.id}">
        <img
            class="episode-thumbnail"
            src="https:${constructEpisodeImage(episode)}"
            alt="${escape(episode.title).replace(/"/g, '&quot;')}">
        <div class="episode-text-content">
          <h2>${escape(episode.title)}</h2>
          <p>
            <span>
              ${formatDate(episode.published)}
            </span>
            <span>
              ${escape(episode.show.title)}
            </span>
          </p>
        </div>
      </div>
    `
  }

  function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date)
    }

    return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`
  }

  function constructEpisodeImage(episode) {
    return episode.imageUrlTemplate
        .replace('{width}', 180)
        .replace('{height}', 100)
  }

  function escape(string) {
    let container = document.createElement('span')
    container.appendChild(document.createTextNode(string))
    return container.innerHTML
  }

})()
