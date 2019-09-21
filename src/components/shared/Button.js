import { html } from 'lit-html/lit-html';
import { PureComponent } from '../../shared/Component';

export const Button = PureComponent(({
    onClick=() => {},
    type='button',
}, children) => {
    return html `
        <button type=${type} @click=${onClick}>
            ${children}
        </button>
    `;
});
