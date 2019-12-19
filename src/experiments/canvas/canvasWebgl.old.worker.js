import { workerMethodCreator } from '../../modules/Worker/utils'
import { toRad } from '../../shared/math'
const exportMethod = workerMethodCreator(self)

let canvas
let gl
let width
let height
let currentLinkState = {}
let linkConfig = []
let buffer
let program
let points = []
let lastTime
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
  for (let { id } of config) {
    currentLinkState[id] = 0
  }
})

const createShader = (gl, shaderType, shaderSource) => {
  const shader = gl.createShader(shaderType)
  gl.shaderSource(shader, shaderSource)
  gl.compileShader(shader)
  return shader
}
const createVertexShader = (gl, shaderSource) =>
  createShader(gl, gl.VERTEX_SHADER, shaderSource)
const createFragmentShader = (gl, shaderSource) =>
  createShader(gl, gl.FRAGMENT_SHADER, shaderSource)
const createProgram = (gl, ...shaders) => {
  const program = gl.createProgram()
  for (let shader of shaders) {
    gl.attachShader(program, shader)
  }
  gl.linkProgram(program)
  return {
    get program() {
      return program
    },
    activateVariable(type, name) {
      return {
        vec2: () => {
          const attribPosition = gl.getAttribLocation(program, name)
          gl.vertexAttribPointer(attribPosition, 2, gl.FLOAT, false, 0, 0)
          gl.enableVertexAttribArray(attribPosition)
        },
      }[type]()
    },
  }
}

const pathBuffer = (gl, path) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(path), gl.STATIC_DRAW)
  return {
    draw() {
      gl.drawArrays(gl.LINE_STRIP, 0, path.length / 2)
    },
  }
}
const clear = gl => {
  gl.clearColor(1, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
}

const setupCanvas = offscreenCanvas => {
  if (canvas !== offscreenCanvas) {
    canvas = offscreenCanvas
    if (!width) width = canvas.width
    if (!height) height = canvas.height
    gl = offscreenCanvas.getContext('webgl')

    const vs = createVertexShader(
      gl,
      `
            precision mediump float;

            attribute vec2 position;

            void main(void) {
                gl_Position = vec4(position.x, position.y, 0.0, 0.75);
            }
        `,
    )
    const fs = createFragmentShader(
      gl,
      `
            precision highp float;

            void main(void) {
              gl_FragColor = vec4(0.0,0.0,0.0,1.0);
            }
        `,
    )
    buffer = gl.createBuffer()
    program = createProgram(gl, vs, fs)
  }
}

const action = time => {
  if (canvas && linkConfig.length) {
    if (!lastTime) {
      lastTime = time
    }
    if (width && canvas.width !== width) {
      canvas.width = width
    }
    if (height && canvas.height !== height) {
      canvas.height = height
    }
    const maxPoints = 2000
    const deltaTime = time - lastTime
    const itterationsPerSecond = 1000
    const itterations = Math.min(
      maxPoints,
      Math.ceil((deltaTime / 1000) * itterationsPerSecond),
    )
    for (let i = 0; i < itterations; i++) {
      const point = linkConfig
        .map(({ id, length, speed, direction }) => {
          const angle = currentLinkState[id] || 0
          currentLinkState[id] = speed * direction + angle
          return v2.mult(v2.fromAngle(toRad(currentLinkState[id])), length)
        })
        .reduce((a, b) => v2.add(a, b), v2(0))
      points.push(point)
    }
    const point = linkConfig
      .map(({ id, length }) =>
        v2.mult(v2.fromAngle(toRad(currentLinkState[id])), length),
      )
      .reduce((a, b) => v2.add(a, b), v2(0))
    points = points.slice(-maxPoints)
    const res = linkConfig
      .map(({ id, length }) =>
        v2.mult(v2.fromAngle(toRad(currentLinkState[id])), length),
      )
      .reduce((a, b) => [...a, v2.add(a[a.length - 1], b)], [v2(0)])
      .flatMap(({ x, y }) => [x / width, y / height])

    const t = points.flatMap(({ x, y }) => [x / width, y / height])

    const pp = pathBuffer(gl, t)
    gl.viewport(0, 0, width, height)
    program.activateVariable('vec2', 'position')
    gl.useProgram(program.program)
    clear(gl)
    pp.draw({ lineWidth: 5 })
    const ff = pathBuffer(gl, res)
    ff.draw()
    CircleGl(gl, point)
    lastTime = time
  }
}
const CircleGl = (gl, center, radius = 20) => {
  let circle = []
  for (let i = 0; i <= 20; i++) {
    const angle = Math.min(1, i / 20) * (Math.PI * 2)
    circle.push(v2.add(center, v2.mult(v2.fromAngle(angle), radius)))
  }
  circle = circle.flatMap(({ x, y }) => [x / width, y / height])
  pathBuffer(gl, circle).draw()
}
const animate = time => {
  action(time)
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
v2.distance = (a, b) => {
  b = typeof b === 'number' ? v2(b) : b
  const xDist = b.x - a.x
  const yDist = b.y - a.y
  if (xDist === 0) return yDist
  if (yDist === 0) return xDist
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
}
