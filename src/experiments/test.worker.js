import { workerMethodCreator } from '../modules/Worker/utils'
const createMethod = workerMethodCreator(self)

createMethod(function add(a, b) {
  return a + b
})
