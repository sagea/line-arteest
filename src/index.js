import { render, html } from 'lit-html';
import { App } from './components/containers/App';
import {store} from './redux/store';
import { createWorkerFromMethod } from './shared/worker';
import { updateForm } from './redux/tasks/linetasks';
import { PathReRenderCanvasPerformant, PathReRenderCanvasWebgl } from './components/containers/PathCanvas/PathRerenderCanvas';
import { LinkCanvasPerformant } from './components/containers/LinkCanvas';

// const pathCanvas = PathReRenderCanvasWebgl(document.body);
// const f = PathReRenderCanvasPerformant(document.body);
// const linkCanvas = LinkCanvasPerformant(document.body);
store.subscribe(renderStuff);
renderStuff();
// setTimeout(() => {
//     const state = store.getState();
//     store.dispatch(updateForm(state.optionFormReducer));
// }, 1000);
function renderStuff() {
    const state = store.getState();

    // linkConfig: 
    // path: linkReducer.path,
    
    // pathCanvas({ path: state.linkReducer.path });
    // f({ path: state.linkReducer.path });
    // linkCanvas({ linkConfig: state.linkReducer.linkConfig });
    render(html `${App()}`, document.querySelector('#awesome'));
}
