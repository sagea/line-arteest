import { handleActions, createAction } from 'redux-actions';

const defaultState = {
    speed: 1,
    options: [
        '400 -20 10',
        '1000 10.01',
        '50 -.1',
    ].join('\n'),
    maxPoints: 5000,
}

export const updateField = createAction('lineDrawer/optionsForm/UPDATE_FIELD');

export default handleActions({
    [updateField]: (state, { payload }) => ({
        ...state,
        [payload.field]: payload.value,
    }),
}, defaultState);
