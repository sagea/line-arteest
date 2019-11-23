import { workerMethodCreator } from '../../modules/Worker/utils'

const exportMethod = workerMethodCreator(self)
// doesn't work :(
const context = new AudioContext()
const osc = new OscillatorNode(context)
const gain = context.createGain()

osc.frequency.setValueAtTime(261.6, 0.0)
gain.gain.value = 0.5

osc.connect(gain).connect(context.destination)

exportMethod(function start() {
  osc.start()
})
exportMethod(function stop() {
  osc.stop()
})
