import {sendMessage} from '../utils.js'
import episodeListTemplate from './ui/episodeList.js'

let content = document.querySelector('#content')
let INCOGNITO
chrome.storage.local.get(STORAGE_KEYS.INCOGNITO, (configuration) => {
  INCOGNITO = !!configuration[STORAGE_KEYS.INCOGNITO]

  sendMessage('fetchEpisodes').then((response) => {
    content.innerHTML = episodeListTemplate(response.episodes)
  })
})

addEventListener('click', (event) => {
  let link = event.target.closest('a')
  if (!link) {
    return
  }

  event.preventDefault()
  openEpisode(link.href)
})

function openEpisode(url) {
  chrome.windows.getAll({ windowTypes: ['normal'] }, (windows) => {
    // Chrome does not allow us to properly manipulate incognito windows for
    // some reason (bug?), so we'll just open an ordinary tab.

    if (INCOGNITO) {
      chrome.windows.create({
        url,
        incognito: true
      })
    } else {
      chrome.tabs.create({
        url
      })
    }
  })
}
