import { html, directive } from 'lit-html/lit-html';

const stateManager = new WeakMap();
const propsManager = new WeakMap();
const childrenManager = new WeakMap();
const statefullComponentManager = new WeakMap();
let qqqq = new WeakMap();
let lastResult = new WeakMap();
// returns true if changed false if not
function shallowCompare(a, b) {
    const aEntries = Object.keys(a);
    const bEntries = Object.keys(b);
    if (aEntries.length !== bEntries.length) return true;
    if (new Set([...aEntries, ...bEntries]).size !== aEntries.length) return true;
    for (let key of aEntries) {
        if (aEntries[key] !== bEntries[key]) return true;
    }
    return false;
}

export const StatefullComponent = 
    (componentMethod, initialState = {}) => directive((props, ...children) => part => {
        if (!stateManager.has(part)) {
            stateManager.set(part, initialState);
            qqqq.set(part, Math.floor(Math.random() * 10000));
            statefullComponentManager.set(part, componentMethod());
        }
        const getState = () => stateManager.get(part);
        const setState = (object) => {
            const newState = { ...getState(), ...object };
            stateManager.set(part, newState);
            triggerUpdate();
        };
        const triggerUpdate = () => {
            const result = statefullComponentManager.get(part)(props, children, getState, setState);
            if (lastResult.get(part) !== result) {
                if (result && result.nodeName && result.nodeName === 'CANVAS') {
                    console.log('Not equal', qqqq.get(part), result);
                }
                part.setValue(result);
                part.commit();
                lastResult.set(part, result);
            }
        };
        triggerUpdate();
    });

export const PureComponent =
    (componentMethod) => directive((props, ...children) => part => {
        if (!propsManager.has(part)) {
            propsManager.set(part, props);
        }
        const result = componentMethod(props, children);
        part.setValue(result);
        part.commit();
    });

export const inputValue = directive((value) => part => {
    part.setValue(value);
    part.commit();
});

let f = new WeakMap();
export const OneTimeElementComponent = (componentMethod) => directive(props => part => {
    if (!f.has(part)) {
        const { element, handlePropsChange } = componentMethod();
        f.set(part, handlePropsChange);
        part.setValue(element);
    }
    f.get(part)(props);
})
