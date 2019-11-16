
import { html } from 'lit-html/lit-html';
import { styleMap } from 'lit-html/directives/style-map';
import { inputValue, StatefullComponent } from '../../shared/Component';
import { LineDefinitionContainer } from './LineDefinitionTextArea';

const containerStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: 'white',
};
export const OptionsForm = StatefullComponent(() => {
    return (props, [], getState, setState) => {
        const {
            speed = 1,
            optionsConfig,
            maxPoints=1000,
            onUpdateField,
            handleSubmit,
            addOption=()=>{},
            removeOption=({id})=>{},
            updateOption=({id, fieldName, value})=>{}
        } = props;
        const { open } = getState();

        const handleFieldChange = fieldName => inputEvent => onUpdateField(fieldName, inputEvent.target.value);
        const submit = (event) => {
            event.preventDefault();
            handleSubmit();
        }
        return html`
        <div style=${styleMap(containerStyles)}>
            <div>
                <button @click=${() => setState({ open: !open })} type="button">${ open ? '-' : '+' }</button>
            </div>
            <form style=${styleMap({ display: open ? 'block' : 'none' })} @submit=${submit} novalidate>
                <label>
                    Speed: (${Math.floor(speed * 100)})<br>
                    <input type="range" min="0" max="1" step=".01" .value=${inputValue(speed)} @input=${handleFieldChange('speed')}>
                </label>
                <br>
                <label>
                    Max Points (${maxPoints}) <br>
                    <input type="range" min="1000" max="50000" step="2" .value=${inputValue(maxPoints)} @input=${handleFieldChange('maxPoints')}>
                </label>
                <br />
                Options: <br>
                ${
                    LineDefinitionContainer({
                        lineDefinitionConfig: optionsConfig,
                        onAdd: addOption,
                        onRemove: removeOption,
                        onUpdate: updateOption,
                    })
                }

                <button type="submit">Start</button>
            </form>
        </div>
        `;
    }
}, { open: true });