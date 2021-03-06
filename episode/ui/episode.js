import {generateElementId} from '../../utils.js'
import episodeLinkTemplate from './episodeLink.js'
import playerTemplate from './player.js'
import richContentTemplate from './richContent.js'

let elementId

export default episode => `
<div class="episode-main-content" data-elm-id="${elementId = generateElementId()}">
  <style>
    .episode-main-content[data-elm-id='${elementId}'] {
      display: flex;
    }
    
    [data-elm-id='${elementId}'] .main-column {
      flex: 1 0 auto;
      align-self: flex-start;
    }
    
    [data-elm-id='${elementId}'] .next-episodes {
      margin-left: 16px;
      flex: 0 0 180px;
    }
  </style>

  <div class="main-column">
    ${playerTemplate(episode)}
    ${richContentTemplate(`<h1 style="margin-top: 0">${episode.title}</h1>${episode.description}`)}
  </div>
  <div class="next-episodes">
    ${episode.nextEpisodes.slice(0, 3).map(episode => episodeLinkTemplate({
      ...episode,
      imageUrl: `https:${episode.imageUrlTemplate.replace('{width}', 180).replace('{height}', 100)}`  
    })).join('')}
  </div>
</div>
`
