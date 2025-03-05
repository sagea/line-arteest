import { handleActions, createAction } from 'redux-actions'
import uuid from 'uuid/v4'
import { toRad } from '../../shared/math'

const modifierA = ({ length }, frameTime) => ({
  length: 50 + 199 * Math.sin(toRad(frameTime / 20)),
  speed: Math.sin(toRad(frameTime / 1000)) * 3.01,
})
const modifierB = ({ speed }, frameTime) => ({
  speed: 180 * Math.sin(toRad(frameTime / 5000) * 40),
})
const defaultState = {
  speed: 1,
  optionsConfig: [
    { id: uuid(), length: 50, speed: -3.01 },
    { id: uuid(), length: 10, speed: 10.01 },
    { id: uuid(), length: 100, speed: 1 },
    { id: uuid(), length: 20, speed: 0 },
  ],
  maxPoints: 2236,
}

const ACTION_PREFIX = `lineDrawer/optionsForm`
export const updateField = createAction(`${ACTION_PREFIX}/UPDATE_FIELD`)
export const addOption = createAction(`${ACTION_PREFIX}/OPTION/ADD`)
export const updateOption = createAction(`${ACTION_PREFIX}/OPTION/UPDATE`)
export const removeOption = createAction(`${ACTION_PREFIX}/OPTION/REMOVE`)

export default handleActions(
  {
    [updateField]: (state, { payload }) => ({
      ...state,
      [payload.field]: payload.value,
    }),
    [addOption]: state => ({
      ...state,
      optionsConfig: [
        ...state.optionsConfig,
        { uuid: uuid(), length: 1, speed: 1 },
      ],
    }),
    [updateOption]: (state, { payload }) => ({
      ...state,
      optionsConfig: state.optionsConfig.map(optionConfig => {
        if (optionConfig.id === payload.id) {
          return {
            ...optionConfig,
            [payload.fieldName]: payload.value,
          }
        }
        return optionConfig
      }),
    }),
    [removeOption]: (state, { payload }) => ({
      ...state,
      optionsConfig: state.optionsConfig.filter(optionConfig => {
        return optionConfig.id !== payload.id
      }),
    }),
  },
  defaultState,
)
