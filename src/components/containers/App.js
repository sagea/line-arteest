import * as lit from 'lit-html';
import {styleMap} from 'lit-html/directives/style-map';
import { PureComponent, StatefullComponent } from '../../shared/Component';
import { OptionsForm } from './OptionsForm';
import { connect } from '../../redux/connect';
import { updateForm } from '../../redux/tasks/linetasks';
import { PathReRenderCanvas, PathReRenderCanvasPerformant } from './PathCanvas/PathRerenderCanvas';
import { updateField } from '../../redux/modules/optionsForm';
import { LinkCanvas, LinkCanvasPerformant } from './LinkCanvas';
const { html } = lit;
console.log(lit);
const mapStateToProps = ({
    optionFormReducer,
    linkReducer,
}) => {
    return {
        speed: optionFormReducer.speed,
        options: optionFormReducer.options,
        maxPoints: optionFormReducer.maxPoints,
        linkConfig: linkReducer.linkConfig,
        path: linkReducer.path,
    };
}
const c = document.createElement('canvas');
export const App = connect(mapStateToProps)(StatefullComponent(() => {
    const pathCanvas = PathReRenderCanvasPerformant(document.body)
    const linkCanvas = LinkCanvasPerformant(document.body);
    return ({
        speed,
        options,
        maxPoints,
        linkConfig,
        path,
        dispatch,
    }) => {
        const handleFormUpdate = (fieldName, value) => {
            dispatch(updateField({ field: fieldName, value }));
        };
        return html `
            <div>
                ${pathCanvas({ path })}
                ${OptionsForm({
                    speed,
                    options,
                    maxPoints,
                    onUpdateField: handleFormUpdate,
                    handleSubmit: () => dispatch(updateForm({ speed, options }))
                })}
            </div>
        `;
    };
}));
