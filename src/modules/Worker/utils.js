import uuid from 'uuid/v4'

export const workerMethodCreator = workerContext => method => {
  workerContext.addEventListener(
    'message',
    ({ data: { event, arguments: args, id } }) => {
      if (event === method.name) {
        Promise.resolve(method(...args)).then(returnValue => {
          workerContext.postMessage({ event: method.name, id, returnValue })
        })
      }
    },
  )
}

export const workerMethodCaller = worker => (
  methodName,
  transferArgs = false,
) => {
  return (...args) => {
    // todo: handle thrown errors inside a worker by rejecting
    return new Promise(resolve => {
      const callId = uuid()
      const call = ({ data: { event, id, returnValue } }) => {
        // nit: the event === methodName shouldn't matter since the uuid should be unique. But I am adding it just in case.
        if (id === callId && event === methodName) {
          resolve(returnValue)
          worker.removeEventListener('message', call)
        }
      }
      worker.addEventListener('message', call)
      worker.postMessage(
        {
          event: methodName,
          arguments: args,
          id: callId,
        },
        transferArgs ? args : [],
      )
    })
  }
}
