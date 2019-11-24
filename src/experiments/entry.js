import { html, render } from 'lit-html'
import { setCanvas, setCanvasDimensions, setLinkConfig } from './canvas/canvas'
import uuid from 'uuid/v4'
;(async () => {
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
  window.addEventListener('resize', () => {
    setCanvasDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  })
  await setCanvas(offscreenCanvas)
  await setLinkConfig([
    { id: uuid(), length: 50, speed: 3.01, direction: -1 },
    { id: uuid(), length: 10, speed: 10.01, direction: 1 },
    { id: uuid(), length: 100, speed: 1, direction: 1 },
    { id: uuid(), length: 20, speed: 1, direction: -1 },
  ])
})()
