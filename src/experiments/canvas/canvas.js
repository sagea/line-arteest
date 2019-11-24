import { workerMethodCaller } from '../../modules/Worker/utils'

const createCaller = workerMethodCaller(
  new Worker('./canvas.worker.js', { type: 'module' }),
)

export const setCanvas = createCaller('setCanvas', true)
export const setCanvasDimensions = createCaller('setCanvasDimensions')
export const setLinkConfig = createCaller('setLinkConfig')
