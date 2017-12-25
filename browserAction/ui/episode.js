import {escapeHTML} from '../../utils.js'

export default episode => `
<a href="${chrome.runtime.getURL(`episode/episode.html?episode=${episode.id}`)}" class="episode" target="_blank">
  <img
    class="episode-thumbnail"
    src="${episode.imageUrl}"
    alt="${escapeHTML(episode.title)}"
  >
  <div class="episode-text-content">
    <h2 title="${escapeHTML(episode.title)}">
      ${escapeHTML(episode.title)}
    </h2>
    <p>
      <span>
        ${formatDate(episode.published)}
      </span>
      <span>
        ${escapeHTML(episode.show.title)}
      </span>
    </p>
  </div>
</a>
`

function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }

  return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`
}
