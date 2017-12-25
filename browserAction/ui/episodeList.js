import episodeTemplate from "./episode.js"

let lastElmId = 0

export default episodes => `
<ul class="episode-list" data-elm-id="episode-list-${++lastElmId}">
  <style>
    .episode-list[data-elm-id='episode-list-${lastElmId}'] {
      margin: 0;
      padding: 0;
    
      list-style: none;
    }
    
    [data-elm-id='episode-list-${lastElmId}'] .episode-list-item {
      border-bottom: 1px solid #a0a0a0;
      padding: 8px 0;
    }
    
    [data-elm-id='episode-list-${lastElmId}'] .episode-list-item:last-child {
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
