import { workerMethodCaller } from '../../modules/Worker/utils'

const createCaller = workerMethodCaller(
  new Worker('./audio.worker.js', { type: 'module' }),
)

export const start = createCaller('start')
export const stop = createCaller('stop')
