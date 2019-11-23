import {
  clear,
  FullWindowCanvas,
  translateToCenter,
  createOffscreenCanvasWorker,
} from '../../../shared/canvas'
import {
  StatefullComponent,
  OneTimeElementComponent,
} from '../../../shared/Component'

function toArrayBuffer(path) {
  const length = path.length
  const arr = new Int16Array(path.length * 2)
  for (let i = 0; i < length; i++) {
    arr[i * 2] = path[i].x
    arr[i * 2 + 1] = path[i].y
  }
  return arr.buffer
}
export const PathReRenderCanvasPerformant = appendTo => {
  const resolution = 2
  const canvas = FullWindowCanvas(resolution)
  const animate = time => (ctx, { path = [], size }) => {
    if (ctx.canvas.width !== size.width) {
      ctx.canvas.width = size.width
    }
    if (ctx.canvas.height !== size.height) {
      ctx.canvas.height = size.height
    }
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    if (path.byteLength === 0) return
    const res = new Int16Array(path)
    ctx.save()
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.moveTo(res[0], res[1])
    for (let i = 0; i < res.length; ) {
      ctx.lineTo(res[i++], res[i++])
    }
    ctx.stroke()
    ctx.restore()
  }
  const offscreenCanvas = canvas.transferControlToOffscreen()
  const options = { alpha: false }
  const setState = createOffscreenCanvasWorker(
    animate,
    offscreenCanvas,
    options,
  )

  function toArrayBuffer(path) {
    const length = path.length
    const arr = new Int16Array(path.length * 2)
    for (let i = 0; i < length; i++) {
      arr[i * 2] = path[i].x
      arr[i * 2 + 1] = path[i].y
    }
    return arr.buffer
  }
  appendTo.appendChild(canvas)
  return ({ path }) => {
    const arrayBuffer = toArrayBuffer(path)
    setState({ path: arrayBuffer }, [arrayBuffer])
  }
}
export const PathReRenderCanvas = StatefullComponent(() => {
  const resolution = 2
  const canvas = FullWindowCanvas(resolution)
  const animate = () => (ctx, { path = [] }) => {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (path.byteLength === 0) return
    const res = new Int16Array(path)
    ctx.save()
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.moveTo(res[0], res[1])
    for (let i = 0; i < res.length; ) {
      ctx.lineTo(res[i++], res[i++])
    }
    ctx.stroke()
    ctx.restore()
  }
  const offscreenCanvas = canvas.transferControlToOffscreen()
  const options = { alpha: false }
  const setState = createOffscreenCanvasWorker(
    animate,
    offscreenCanvas,
    options,
  )

  return ({ path }) => {
    const arrayBuffer = toArrayBuffer(path)
    setState({ path: arrayBuffer }, [arrayBuffer])
    return canvas
  }
}, {})

export const PathReRenderCanvasWebgl = appendTo => {
  const canvas = FullWindowCanvas()
  const animate = gl => {
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
    const buffer = gl.createBuffer()

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
    const program = createProgram(gl, vs, fs)

    return (gl, { path = [] }) => {
      const arrayPath = Array.from(new Int16Array(path))
      if (arrayPath.length >= 4) {
        const { width, height } = gl.canvas
        const f = arrayPath.map((value, i) => {
          if (i % 2 === 0) {
            return value / width
          }
          return value / height
        })
        const pp = pathBuffer(gl, f)
        gl.viewport(0, 0, width, height)
        // gl.enable(gl.DEPTH_TEST)
        program.activateVariable('vec2', 'position')
        gl.useProgram(program.program)
        clear(gl)
        pp.draw({ lineWidth: 5 })
      }
    }
  }
  const offscreenCanvas = canvas.transferControlToOffscreen()
  const options = {
    antialias: true,
    transparent: false,
  }
  const setState = createOffscreenCanvasWorker(
    animate,
    offscreenCanvas,
    options,
    'webgl',
  )
  appendTo.appendChild(canvas)
  return ({ path }) => {
    const arrayBuffer = toArrayBuffer(path)
    const min = path.length
      ? path.reduce((a, b) => Math.min(a.x || a, b.x || a))
      : 0
    const max = path.length
      ? path.reduce((a, b) => Math.max(a.x || a, b.x || a))
      : 0
    const width = Math.ceil((max - min) / 20) * 20
    setState(
      {
        path: arrayBuffer,
        width: Math.min(window.innerWidth, width),
        height: Math.min(window.innerHeight, width),
      },
      [arrayBuffer],
    )
  }
}

const WEBGL_ROTATION_STUFF = `
#define resolution vec2(500.0, 500.0)
#define Thickness 0.03

float drawLine(vec2 p1, vec2 p2, vec2 uv) {
  float a = abs(distance(p1, uv));
  float b = abs(distance(p2, uv));
  float c = abs(distance(p1, p2));
  if ( a >= c || b >=  c ) return 0.0;
  float p = (a + b + c) * 0.5;
  float h = 2.0 / c * sqrt( p * ( p - a) * ( p - b) * ( p - c));
  return mix(1.0, 0.0, smoothstep(0.03, 0.032, h * .1));
}

vec2 cPoint(float angle, float length) {
	return vec2(
        cos(angle),
        sin(angle)
    ) * length;
}
vec2 rotate (vec2 pt, float angle) {
	return vec2(
        (pt.x * cos(angle)) - (pt.y * sin(angle)),
        (pt.x * sin(angle)) + (pt.y * cos(angle))
    );
}
vec2[4] doTheThing(vec2[4] vectors, float[3] speeds, float time) {
    vec2 last = vectors[0];
    vec2[4] result = vec2[](vec2(0), vec2(0), vec2(0), vec2(0));
	for (int i = 0; i < vectors.length(); i++) {
        float speed = speeds[i - 1];
        vec2 currentOG = vectors[i];
        vec2 current = last + rotate(currentOG, time * speed);
    	result[i] = current;
        last = current;
    }
    return result;
}
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec4 lastColor = texture(iChannel0, uv);
    float[3] speeds = float[](
    	.2,
        -.3,
        .5
    );
    vec2[4] vectors = vec2[](
        vec2(0),
        vec2(.1),
        vec2(.2),
        vec2(.1)
    );
    vec2[4] lastPoints = doTheThing(vectors, speeds, iTime - iTimeDelta - 0.1);
    vec2[4] points = doTheThing(vectors, speeds, iTime);
    vec4 ballColor = vec4(0);
    float distance = drawLine(lastPoints[3] + 0.5, points[3] + .5, uv); 
    if (distance > 0.1) {
    	ballColor = vec4(distance, distance, distance, 1);
    }
    if (ballColor.a > 0.0) {
        fragColor = ballColor;
    } else if (lastColor.b > 0.0) {
    	fragColor = lastColor * 0.99;
    } else {
    	fragColor = vec4(0, 0, 0, 1);
    }
}
`
