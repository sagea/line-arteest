import CanvasWorker from './canvas.worker'
import { workerMethodCaller } from '../../modules/Worker/utils'

const createCaller = workerMethodCaller(new CanvasWorker())

export const setCanvas = createCaller('setCanvas', true)
export const setCanvasDimensions = createCaller('setCanvasDimensions')
export const setLinkConfig = createCaller('setLinkConfig')
