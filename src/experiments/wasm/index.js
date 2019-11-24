const loader = require('@assemblyscript/loader')
const fs = require('fs')
// const compiled = new WebAssembly.Module(
//   fs.readFileSync(__dirname + '/build/untouched.wasm'),
// )
const imports = {
  env: {
    abort(_msg, _file, line, column) {
      console.error('abort called at index.ts:' + line + ':' + column)
    },
  },
}
;(async () => {
  const m = await loader.instantiateStreaming(
    Promise.resolve(fs.readFileSync(__dirname + '/build/untouched.wasm')),
    imports,
  )
  //const str = m.__retain(m.__allocString('awesome'))
  const value = m.addHello('awesome')
  const res = m.__getString(value)
  console.log(res)
  //m.__release(str)
  m.__release(value)
})()
