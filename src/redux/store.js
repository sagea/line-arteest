import { createStore, combineReducers, applyMiddleware } from 'https://unpkg.com/redux@4.0.1/dist/redux.js';
import { batchDispatchMiddleware } from '../shared/batchedActions.js'
import thunk from 'https://unpkg.com/redux-thunk@2.3.0/es/index.js';
import optionFormReducer from './modules/optionsForm.js';
import linkReducer from './modules/Link.js';

const reducer = combineReducers({
    linkReducer,
    optionFormReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk, batchDispatchMiddleware));
