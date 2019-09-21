import { html } from 'https://unpkg.com/lit-html@1.1.0/lit-html.js?module';
import { PureComponent } from '../../shared/Component.js';

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
