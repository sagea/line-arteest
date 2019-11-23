import TestWorker from './test.worker'
import { workerMethodCaller } from '../modules/Worker/utils'

const worker = new TestWorker()
const createCaller = workerMethodCaller(worker)

// worker.addEventListener('message', event => {
//   console.log('main thread', event)
// })
// worker.postMessage({ event: 'hello', data: { value: 'awesome sauce of doom' } })

export const add = createCaller('add')
