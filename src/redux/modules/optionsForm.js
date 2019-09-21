import { handleActions, createAction } from 'redux-actions';

const defaultState = {
    speed: 1,
    options: [
        '250 -3.01',
        '100 10.01',
        '50 1',
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
