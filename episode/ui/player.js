import {escapeHTML, generateElementId} from '../../utils.js'

const TARGET_QUALITY = 720;

let elementId = 0

export default episode => {
  let source = {
    quality: -Infinity
  }
  for (const sourceOption of episode.videoSource) {
    if (Math.abs(sourceOption.quality - TARGET_QUALITY) < Math.abs(source.quality - TARGET_QUALITY)) {
      source = sourceOption
    }
  }

  return `
    <div class="player" data-elm-id="${elementId = generateElementId()}">
      <style>
        .player[data-elm-id='${elementId}'] {
          position: relative;
        
          margin-bottom: 24px;
        }
      
        [data-elm-id='${elementId}']::before {
          display: block;
        
          padding-top: ${(1 / episode.aspectRatio) * 100}%;
          width: 100%;
          height: 0;

          content: '';
        }
        
        [data-elm-id='${elementId}'] .player-video {
          position: absolute;
          left: 0;
          top: 0;
        
          width: 100%;
          height: 100%;
        }
      </style>
      
      <video class="player-video" controls autoplay preload="auto">
        <source src="${escapeHTML(source.source)}" type="${escapeHTML(source.type)}">
      </video>
    </div>
  `
}
