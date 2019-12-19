import { workerMethodCaller } from '../../modules/Worker/utils'

const createCaller = workerMethodCaller(
  new Worker('./canvasWebgl.worker.js', { type: 'module' }),
)

export const setCanvas = createCaller('setCanvas', true)
export const setWindowDimensions = createCaller('setWindowDimensions')
export const setLinkConfig = createCaller('setLinkConfig')
