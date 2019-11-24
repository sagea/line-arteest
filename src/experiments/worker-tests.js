import { workerMethodCaller } from '../modules/Worker/utils'

const createCaller = workerMethodCaller(
  new Worker('./test.worker.js', { type: 'module' }),
)

export const add = createCaller('add')
