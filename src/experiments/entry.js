import { add } from './worker-tests'
import { setCanvas, setCanvasDimensions, setLinkConfig } from './canvas/canvas'
import uuid from 'uuid/v4'
// ;(async () => {
//   let value = 0
//   for (let i = 0; i < 100; i++) {
//     value = await add(value, i)
//     console.log('single call', value)
//   }
//   console.log('final', value)
// })()
;(() => {
  const canvas = document.createElement('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  Object.assign(canvas.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    border: '1px solid #ccc',
  })
  document.body.appendChild(canvas)
  const offscreenCanvas = canvas.transferControlToOffscreen()
  setCanvas(offscreenCanvas)
  setLinkConfig([
    { id: uuid(), length: 10, speed: 0.02 },
    { id: uuid(), length: 5, speed: -0.0501 },
    { id: uuid(), length: 20, speed: -0.011 },
  ])
  window.addEventListener('resize', () => {
    setCanvasDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  })
})()
