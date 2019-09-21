import * as lit from 'https://unpkg.com/lit-html@1.1.0/lit-html.js?module';
import {styleMap} from 'https://unpkg.com/lit-html@1.1.0/directives/style-map.js?module';
import { PureComponent, StatefullComponent } from '../../shared/Component.js';
import { OptionsForm } from './OptionsForm.js';
import { connect } from '../../redux/connect.js';
import { updateForm } from '../../redux/tasks/linetasks.js';
import { PathReRenderCanvas, PathReRenderCanvasPerformant } from './PathCanvas/PathRerenderCanvas.js';
import { updateField } from '../../redux/modules/optionsForm.js';
import { LinkCanvas, LinkCanvasPerformant } from './LinkCanvas.js';
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
    const pathCanvas = PathReRenderCanvasPerformant()
    const linkCanvas = LinkCanvasPerformant(document.body);
    linkCanvas({ linkConfig: [] });
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
        linkCanvas({ linkConfig });
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
