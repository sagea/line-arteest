import { html, render } from 'lit-html'
import { setCanvas, setCanvasDimensions, setLinkConfig, setWindowDimensions } from './canvas/canvas'
import uuid from 'uuid/v4'
Object.assign(document.body.style, {
  backgroundColor: 'black',
})
;(async () => {
  const div = document.createElement('div');
  Object.assign(div.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  })
  const canvas = div.appendChild(document.createElement('canvas'))
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  Object.assign(canvas.style, {
    border: '1px solid #ccc',
    pointerEvents: 'none',
  })
  document.body.appendChild(div)
  const offscreenCanvas = canvas.transferControlToOffscreen()
  window.addEventListener('resize', () => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  })
  await setWindowDimensions({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  await setCanvas(offscreenCanvas)
  await setLinkConfig([
    { id: uuid(), length: 50, speed: 3.01, direction: -1 },
    { id: uuid(), length: 10, speed: 10.01, direction: 1 },
    { id: uuid(), length: 100, speed: 1, direction: 1 },
    { id: uuid(), length: 20, speed: 1, direction: -1 },
  ].map(i => ({ ...i, length: i.length * 2 })))
})()
