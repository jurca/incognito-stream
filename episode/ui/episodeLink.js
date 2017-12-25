import {escapeHTML, generateElementId} from '../../utils.js'

let elementId

export default episode => `
<a
  href="${chrome.runtime.getURL(`episode/episode.html?episode=${episode.id}`)}"
  class="next-episode"
  data-elm-id="${elementId = generateElementId()}"
>
  <style>
    .next-episode[data-elm-id='${elementId}'] {
      display: block;
      
      margin: 0 0 16px;
     
      color: #000000;
      text-decoration: none;
      
      cursor: pointer;
    }
    
    .next-episode[data-elm-id='${elementId}']:hover {
      background: #f0f0f0;
    }
    
    [data-elm-id='${elementId}'] h2 {
      margin: 0;
      
      font-size: 0.9rem;
      font-weight: normal;
    }
    
    [data-elm-id='${elementId}'] h3 {
      margin: 0;
      
      font-size: 0.7rem;
      font-weight: normal;
    }
  </style>

  <img src="${episode.imageUrl}" alt="${escapeHTML(episode.title)}">
  <h2>${escapeHTML(episode.title)}</h2>
  <h3>${escapeHTML(episode.show.title)}</h3>
</a>
`
