import { workerMethodCreator } from '../../modules/Worker/utils'
const exportMethod = workerMethodCreator(self)
let canvas
let ctx
let width
let height
let currentLinkState = {}
let linkConfig = []
let maxLinkSize = 0
exportMethod(function setCanvas(offscreenCanvas) {
  setupCanvas(offscreenCanvas)
})

exportMethod(function setCanvasDimensions(event) {
  width = event.width
  height = event.height
})

exportMethod(function setLinkConfig(config) {
  currentLinkState = {}
  linkConfig = config
  maxLinkSize = config.map(({ length }) => length).reduce((a, b) => a + b) * 2
  for (let { id } of config) {
    currentLinkState[id] = 0
  }
})
const setupCanvas = offscreenCanvas => {
  if (canvas !== offscreenCanvas) {
    canvas = offscreenCanvas
    ctx = offscreenCanvas.getContext('2d')
    if (!width) {
      width = canvas.width
    }
    if (!height) {
      height = canvas.height
    }
  }
}
let points = []
const animate = time => {
  if (canvas && linkConfig.length) {
    if (width && canvas.width !== width) {
      canvas.width = width
    }
    if (height && canvas.height !== height) {
      canvas.height = height
    }
    for (let i = 0; i < 20; i++) {
      const point = linkConfig
        .map(({ id, length, speed }) => {
          currentLinkState[id] += speed
          return v2.mult(v2.fromAngle(currentLinkState[id]), length)
        })
        .reduce((a, b) => v2.add(a, b), v2(0))
      points = [...points, point].slice(-10000)
      ctx.save()
      ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)
      const s = maxLinkSize * 1.5
      ctx.clearRect(-s / 2, -s / 2, s, s)

      const res = linkConfig
        .map(({ id, length }) => {
          const angle = currentLinkState[id]
          return v2.mult(v2.fromAngle(angle), length)
        })
        .reduce((a, b) => [...a, v2.add(a[a.length - 1], b)], [v2(0)])

      eachNext(res, (last, next) => Line(ctx, last, next))
      // Point(ctx, point, 5)
      Path(ctx, points)
      ctx.restore()
    }
  }
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)

const v2 = (x, y) => ({ x, y: typeof y === 'number' ? y : x })
v2.add = (a, b) => {
  b = typeof b === 'number' ? v2(b) : b
  return v2(a.x + b.x, a.y + b.y)
}
v2.mult = (a, b) => {
  b = typeof b === 'number' ? v2(b) : b
  return v2(a.x * b.x, a.y * b.y)
}
v2.fromAngle = angle => v2(Math.cos(angle), Math.sin(angle))

const Line = (ctx, from, to) => {
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(from.x, from.y)
  ctx.lineTo(to.x, to.y)
  ctx.stroke()
  ctx.restore()
}
const Path = (ctx, points) => {
  ctx.save()
  ctx.beginPath()
  const [{ x, y }, ...rest] = points
  ctx.lineWidth = 2
  ctx.moveTo(x, y)
  rest.forEach(({ x, y }) => ctx.lineTo(x, y))
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}
const Point = (ctx, pos, radius) => {
  ctx.save()
  ctx.beginPath()
  ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}

const eachNext = (arr, callback) => {
  for (let i = 1; i < arr.length; i++) {
    callback(arr[i - 1], arr[i])
  }
}
