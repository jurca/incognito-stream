import {escapeHTML} from '../../utils.js'

let lastElmId = 0

export default episode => `
<a href="${chrome.runtime.getURL(`episode/episode.html?episode=${episode.id}`)}" class="episode" target="_blank" data-elm-id="episode-${++lastElmId}">
  <style>
    .episode[data-elm-id='episode-${lastElmId}'] {
      display: flex;
    
      color: #000000;
      text-decoration: none;
    
      cursor: pointer;
    }
    
    .episode[data-elm-id='episode-${lastElmId}']:hover {
      background: #f0f0f0;
    }
    
    [data-elm-id='episode-${lastElmId}'] .episode-thumbnail {
      margin-right: 16px;
      width: 180px;
      height: 100px;
      flex: 0 0 auto;
    }
    
    [data-elm-id='episode-${lastElmId}'] .episode-text-content {
      width: calc(100% - 196px);
      flex: 1 0 auto;
    }
    
    [data-elm-id='episode-${lastElmId}'] .episode-text-content h2 {
      margin: 0 0 16px;
    
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  </style>

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
