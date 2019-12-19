import { workerMethodCreator } from '../../modules/Worker/utils'
import { toRad } from '../../shared/math'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { createActions, handleActions } from 'redux-actions'
import { v2 } from './vector'

const exportMethod = workerMethodCreator(self)
const actions = createActions(
  'setTime',
  'preRender',
  'setLinkConfig',
  'setWindowDimensions',
  'frame',
)
const defaultState = {
  linkRotation: {},
  linkConfig: [],
  points: [],
  windowWidth: undefined,
  windowHeight: undefined,
  width: undefined,
  height: undefined,
  itterationsPerSecond: 1000,
  maxPoints: 10700,
  linkRotationVector: [],
  // todo: make reducer
  time: {
    last: undefined,
    now: undefined,
    delta: undefined,
    fps: [],
  },
}
setInterval(() => {
  const { fps } = store.getState().time
  const start = fps[0]
  const latest = fps[fps.length - 1]
  const foo = 1000 / ((latest - start) / fps.length)
  console.log(foo)
  // console.log(fps.reduce((a, b) => a + b) / fps.length, 0)
}, 300)
const reducer = handleActions(
  {
    [actions.frame]: state => {
      const linkRotation = state.linkConfig.reduce(
        (linkRotation, { id, speed, direction }) => ({
          ...linkRotation,
          [id]: linkRotation[id] + speed * direction,
        }),
        state.linkRotation,
      )
      const linkRotationVector = state.linkConfig.map(({ id, length }) =>
        v2.mult(v2.fromAngle(toRad(linkRotation[id])), length),
      )
      const point = linkRotationVector.reduce((a, b) => v2.add(a, b), v2(0, 0))
      return {
        ...state,
        linkRotation,
        linkRotationVector,
        points: [...state.points, point].slice(-state.maxPoints),
      }
    },
    [actions.setTime]: (state, { payload }) => {
      const now = payload
      const last = typeof state.time.now == 'number' ? state.time.now : payload
      const delta = now - last
      const fps = [...state.time.fps, state.time.now].slice(-5)
      return {
        ...state,
        time: {
          ...state.time,
          last,
          now,
          delta,
          fps: fps,
        },
      }
    },
    [actions.setLinkConfig]: (state, { payload }) => {
      const maxLength = payload.reduce((a, { length }) => a + length, 0);
      const size = maxLength + 20
      return {
        ...state,
        width: size,
        height: size,
        points: [],
        linkRotationVector: [],
        linkConfig: payload,
        linkRotation: payload.reduce((res, { id }) => ({ ...res, [id]: 0 }), {}),
      };
    },
    [actions.setWindowDimensions]: (state, { payload }) => ({
      ...state,
      windowWidth: payload.width,
      windowHeight: payload.height,
    }),
  },
  defaultState,
)

const store = createStore(reducer, applyMiddleware(thunk))

let canvas
let gl
let buffer
let program

exportMethod(function setCanvas(offscreenCanvas) {
  setupCanvas(offscreenCanvas)
})

exportMethod(function setWindowDimensions({ width, height }) {
  store.dispatch(actions.setWindowDimensions({ width, height }))
})

exportMethod(function setLinkConfig(config) {
  store.dispatch(actions.setLinkConfig(config))
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
}

const setupCanvas = offscreenCanvas => {
  if (canvas !== offscreenCanvas) {
    canvas = offscreenCanvas
    gl = offscreenCanvas.getContext('webgl')

    const vs = createVertexShader(
      gl,
      `
        precision mediump float;

        attribute vec2 position;

        void main(void) {
            gl_Position = vec4(position.x, position.y, 0.0, 1.0);
        }
      `,
    )
    const fs = createFragmentShader(
      gl,
      `
        precision highp float;
        void main(void) {
          float v = 0.6;
          gl_FragColor = vec4(v, v, v, 1);
        }
      `,
    )
    buffer = gl.createBuffer()
    program = createProgram(gl, vs, fs)
  }
}

const render = () => {
  const { linkRotationVector, points, width, height, windowWidth, windowHeight } = store.getState()
  if (points.length >= 10 && windowHeight && windowWidth && width && height) {
    const point = points[points.length - 1]
    const res = linkRotationVector
      .reduce((a, b) => [...a, v2.add(a[a.length - 1], b)], [v2(0, 0)])
      .flatMap(([x, y]) => [x / width, y / height])
    const t = points.flatMap(([x, y]) => [x / width, y / height])
    gl.canvas.width = Math.min(windowWidth, width)
    gl.canvas.height = Math.min(windowHeight, height)
    gl.viewport(0, 0, width, height)
    program.activateVariable('vec2', 'position')
    gl.useProgram(program.program)
    pathBuffer(gl, t)
    pathBuffer(gl, t)
    gl.drawArrays(gl.LINE_STRIP, 0, t.length / 2)
    pathBuffer(gl, res)
    gl.drawArrays(gl.LINE_STRIP, 0, res.length / 2)
    CircleGl(gl, point)
  }
}

const CircleGl = (gl, center, radius = 20) => {
  const { width, height } = store.getState()
  let circle = []
  for (let i = 0; i <= 20; i++) {
    const angle = Math.min(1, i / 20) * (Math.PI * 2)
    circle.push(v2.add(center, v2.mult(v2.fromAngle(angle), radius)))
  }
  circle = circle.flatMap(([x, y]) => [x / width, y / height])
  pathBuffer(gl, circle)
  gl.drawArrays(gl.TRIANGLE_FAN, 0, circle.length / 2)
}
const animate = currentTime => {
  store.dispatch(actions.setTime(currentTime))
  const { itterationsPerSecond, time } = store.getState()
  const seconds = Math.min(0.5, time.delta / 1000)
  const itterations = Math.ceil(seconds * itterationsPerSecond)
  for (let i = 0; i < itterations; i++) {
    store.dispatch(actions.frame())
  }
  render()
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)
