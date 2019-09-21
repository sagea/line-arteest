import { handleActions, createAction } from 'https://unpkg.com/redux-actions@2.6.5';
import { Vector } from '../../shared/vector.js';

const defaultState = {
    linkConfig: [],
    links: [],
    path: [],
};

export const applyLinkConfig = createAction('lineDrawer/Link/APPLY_LINK_CONFIG');
export const setLinkRotation = createAction('lineDrawer/Link/SET_LINK_ROTATION');
export const setPath = createAction('lineDrawer/Link/SET_PATHS');

export default handleActions({
    [applyLinkConfig]: (state, { payload }) => ({
        ...state,
        linkConfig: [...payload],
        links: payload.map(({ length }) => Vector(length, 0)),
    }),
    [setLinkRotation]: (state, { payload }) => ({
        ...state,
        links: [ ...payload ],
    }),
    [setPath]: (state, { payload }) => ({
        ...state,
        path: payload,
    }),
}, defaultState);