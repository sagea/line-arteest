import { html } from 'lit-html'
import { styleMap } from 'lit-html/directives/style-map'
import { PureComponent, StatefullComponent } from '../../shared/Component'
import { OptionsForm } from './OptionsForm'
import { connect } from '../../redux/connect'
import { updateForm } from '../../redux/tasks/linetasks'
import {
  updateField,
  updateOption,
  addOption,
  removeOption,
} from '../../redux/modules/optionsForm'
import { PathCanvas } from './PathCanvas/PathCanvas'
import { PathReRenderCanvasWebgl } from './PathCanvas/PathRerenderCanvas'

const mapStateToProps = ({ optionFormReducer, linkReducer }) => {
  return {
    speed: optionFormReducer.speed,
    options: optionFormReducer.options,
    maxPoints: optionFormReducer.maxPoints,
    optionsConfig: optionFormReducer.optionsConfig,
    linkConfig: linkReducer.linkConfig,
    path: linkReducer.path,
  }
}

export const getPathDimensions = path => {
  let top = 0
  let bottom = 0
  let left = 0
  let right = 0
  for (let point of path) {
    top = Math.min(point.y, top)
    bottom = Math.max(point.y, bottom)
    left = Math.min(point.x, left)
    right = Math.max(point.x, right)
  }
  return {
    top,
    bottom,
    left,
    right,
    height: bottom - top,
    width: right - left,
  }
}
export const App = connect(mapStateToProps)(
  StatefullComponent(
    (props, children, getState, setState) => {
      const canvas = PathReRenderCanvasWebgl(document.body)
      // const linkCanvas = LinkCanvasPerformant(document.body);
      const linkConfigMap = new WeakMap()
      return (
        {
          speed,
          options,
          maxPoints,
          linkConfig,
          optionsConfig,
          path,
          dispatch,
        },
        children,
        getState,
        setState,
      ) => {
        const handleFormUpdate = (fieldName, value) => {
          dispatch(updateField({ field: fieldName, value }))
        }
        // if (!linkConfigMap.has(linkConfig)) {
        //     linkConfigMap.set(linkConfig, linkConfig.reduce((res, i) => res + Math.abs(i.length), 0) * 2)
        // }
        const { width, height } = getPathDimensions(path)
        // const size = linkConfigMap.get(linkConfig);
        // ${PathCanvas({ path, width: Math.min(width, window.innerWidth), height: Math.min(height, window.innerHeight) })}
        // ${PathCanvas({
        //     linkConfig,
        //     path,
        //     width: window.innerWidth,
        //     height: window.innerHeight,
        //   })}
        return html`
          <div>
            ${canvas({ path })}
            ${OptionsForm({
              speed,
              optionsConfig,
              options,
              maxPoints,
              onUpdateField: handleFormUpdate,
              handleSubmit: () =>
                dispatch(updateForm({ speed, options, optionsConfig })),
              addOption: () => dispatch(addOption()),
              removeOption: ({ id }) => dispatch(removeOption({ id })),
              updateOption: ({ id, fieldName, value }) =>
                dispatch(updateOption({ id, fieldName, value })),
            })}
          </div>
        `
      }
    },
    { useWebGl: false },
  ),
)
