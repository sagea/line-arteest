import { render, html } from 'lit-html'
import { App } from './components/containers/App'
import { store } from './redux/store'
import './experiments/entry'

// const renderApp = () => {
//   render(
//     html`
//       ${App()}
//     `,
//     document.querySelector('#awesome'),
//   )
// }
// store.subscribe(renderApp)
// renderApp()
