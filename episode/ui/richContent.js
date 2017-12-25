import {generateElementId} from '../../utils.js'

let elementId

export default content => `
<div data-elm-id="${elementId = generateElementId()}">
  <style>
    [data-elm-id='${elementId}'] iframe {
      border: 0;
      width: 100%;
      height: 0;
    }
  </style>

  <iframe
    class="episode-description"
    srcdoc="
      ${content.replace(/"/g, '&quot;')}
      <script data-elm-id=${elementId} src=&quot;ui/richContent-contentSizeReporter.js&quot;></script>
    "
    sandbox="allow-scripts"
  >
  </iframe>
</div>
`

export function registerRichContentElement() {
  addEventListener('message', processMessage)
}

function processMessage(event) {
  const data = JSON.parse(event.data)
  const frame = document.querySelector(`[data-elm-id='${parseInt(data.elementId, 10)}'] iframe`)
  frame.style.height = `${parseInt(data.contentHeight, 10)}px`
}
