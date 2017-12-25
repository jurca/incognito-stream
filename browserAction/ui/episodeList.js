import episodeTemplate from "./episode.js"

export default episodes => `
<ul class="episode-list">
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
