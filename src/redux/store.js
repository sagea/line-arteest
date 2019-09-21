import { createStore, combineReducers, applyMiddleware } from 'redux';
import { batchDispatchMiddleware } from '../shared/batchedActions'
import thunk from 'redux-thunk';
import optionFormReducer from './modules/optionsForm';
import linkReducer from './modules/Link';

const reducer = combineReducers({
    linkReducer,
    optionFormReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk, batchDispatchMiddleware));
