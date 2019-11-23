self.addEventListener('message', ({ data: { event, data } }) => {
  switch (event) {
    case 'init': {

    }
    default: {
      throw new Error(`Worker failed unknown event "${event}"`)
    }
  }
})

export const setOptions = () => {

}

export const setCanvas = (offscreenCanvas) => {

}