import { html, directive } from 'lit-html'

const polyfillOnBeforeInput = (input) => {
    if (input.onbeforeinput === undefined) {
        let _get = null;
        Object.defineProperty(input, 'onbeforeinput', {
            get() { return _get; },
            set(value) {
                if (value === _get) {
                    return;
                };
                if (typeof _get === 'function') {
                    input.removeEventListener('beforeinput', _get);
                }
                if (typeof value === 'function') {
                    input.addEventListener('beforeinput', value);
                }
                _get = value;
            }
        })
    }
    return input;
}
const numberFieldState = new WeakMap();
export const NumberField = directive(({ value, onInput=()=>{}}) => {
    return (part) => {
        if (!numberFieldState.has(part)) {
            const input = polyfillOnBeforeInput(document.createElement('input'));
            input.setAttribute('type', 'text');
            numberFieldState.set(part, {
                input,
                lastSetValue: undefined,
            });
            part.setValue(input);
        }
        if (typeof value !== 'number') {
            value = NaN;
        }
        let cache = {
            value: null,
            selectionStart: null,
            selectionEnd: null,
        }
        const handleBeforeInput = (event) => {
            cache.value = event.target.value;
            cache.selectionStart = event.target.selectionStart;
            cache.selectionEnd = event.target.selectionEnd;
        };
        const sendInputUpdate = (newValue, event) => {
            if (newValue !== value) {
                onInput({ value: newValue, event });
            }
        }
        const handleInput = event => {
            const {target} = event;
            if (!event.target.value && document.activeElement === event.target) {
                // skip the empty case. Let them clear the field and add a number later
                return;
            }

            if (!/^(-)?(\d+|\d*\.\d+|\d+\.\d*)$/.test(target.value)) {  
                target.value = cache.value;
                target.focus();
                target.setSelectionRange(cache.selectionStart, cache.selectionEnd);
            } else {
                sendInputUpdate(parseFloat(target.value), event);
            }
        }
        const handleblur = event => {
            if (!event.target.value) {
                event.target.value = 0;
                sendInputUpdate(0, event);
            }
        }
        const state = numberFieldState.get(part);
        if (parseFloat(state.input.value) !== value && state.lastSetValue !== value) {
            state.input.value = value;
            state.lastSetValue = value;
        }
        state.input.onbeforeinput = handleBeforeInput;
        state.input.oninput = handleInput;
        state.input.onblur = handleblur;
    }
});
