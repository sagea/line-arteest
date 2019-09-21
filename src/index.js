import './serviceWorkerEntry.js';
import { render, html } from 'https://unpkg.com/lit-html@1.1.0/lit-html.js?module';
import { App } from './components/containers/App.js';
import {store} from './redux/store.js';
import { createWorkerFromMethod } from './shared/worker.js';
import { updateForm } from './redux/tasks/linetasks.js';
import { PathReRenderCanvasPerformant, PathReRenderCanvasWebgl } from './components/containers/PathCanvas/PathRerenderCanvas.js';
import { LinkCanvasPerformant } from './components/containers/LinkCanvas.js';

// const pathCanvas = PathReRenderCanvasWebgl(document.body);
const f = PathReRenderCanvasPerformant(document.body);
// const linkCanvas = LinkCanvasPerformant(document.body);
store.subscribe(renderStuff);
renderStuff();
setTimeout(() => {
    const state = store.getState();
    store.dispatch(updateForm(state.optionFormReducer));
}, 1000);
function renderStuff() {
    const state = store.getState();

    // linkConfig: 
    // path: linkReducer.path,
    
    // pathCanvas({ path: state.linkReducer.path });
    f({ path: state.linkReducer.path });
    // linkCanvas({ linkConfig: state.linkReducer.linkConfig });
    // render(html `${App()}`, document.querySelector('#awesome'));
}
