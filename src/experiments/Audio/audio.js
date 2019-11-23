import AudioWorker from './audio.worker'
import { workerMethodCaller } from '../../modules/Worker/utils'

const createCaller = workerMethodCaller(new AudioWorker())

export const start = createCaller('start')
export const stop = createCaller('stop')
