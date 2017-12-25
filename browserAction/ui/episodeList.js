import {generateElementId} from '../../utils.js'
import episodeTemplate from './episode.js'

let elementId

export default episodes => `
<ul class="episode-list" data-elm-id="${elementId = generateElementId()}">
  <style>
    .episode-list[data-elm-id='${elementId}'] {
      margin: 0;
      padding: 0;
    
      list-style: none;
    }
    
    [data-elm-id='${elementId}'] .episode-list-item {
      border-bottom: 1px solid #a0a0a0;
      padding: 8px 0;
    }
    
    [data-elm-id='${elementId}'] .episode-list-item:last-child {
      border-bottom: none;
    }
  </style>
  
  ${episodes.map(episode => `
    <li class="episode-list-item">
      ${episodeTemplate({
        ...episode,
        imageUrl: `https:${episode.imageUrlTemplate.replace('{width}', 180).replace('{height}', 100)}`
      })}
    </li>
  `).join('')}
</ul>
`
