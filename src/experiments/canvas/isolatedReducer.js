
const yeah = createIsolatedReducer({
  awesome (state, ...args) {
    return { ...state }
  }
})

yeah.actions.awesome(foo, bar)
yeah.subscribe(() => {

})