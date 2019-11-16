import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map';
import { NumberField } from '../shared/NumberField';

/*
    interface LineDefinitionReducer {
        byId: { [string]: LineDefinition },
        
    }
    interface LineDefinitionConfig {
        id: string;
        length: string;
        speed: string;
    }

*/

export const LineDefinition = ({ length, speed, onUpdate=()=>{}, onRemove=()=>{} }) => {
    const update = (name) => (event) => onUpdate({ name, value: event.value });
    return html`
        <div style=${styleMap({ display: 'flex', justifyContent: 'center' })}>
            <label>Length ${NumberField({ value: length, onInput: update('length') })}</label>
            <label>Speed ${NumberField({ value: speed, onInput: update('speed') })}</label>
            <button type="button" @click=${onRemove}>X</button>
        </div>
    `
}
export const LineDefinitionContainer = ({ lineDefinitionConfig, onAdd, onRemove, onUpdate }) => {
    return html`
        <div>
            <div>
                <button type="button" @click=${onAdd}>Add</button>
            </div>
            <div>
                ${
                    lineDefinitionConfig.map(({ length, speed, id }) => LineDefinition({    
                        length,
                        speed,
                        onUpdate: ({ name, value }) => onUpdate({ id, fieldName: name, value }),
                        onRemove: () => onRemove({ id }),
                    }))
                }
            </div>
        </div>
    `
}