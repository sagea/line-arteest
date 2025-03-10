import { store } from './store';

export const connect = (mapStateToProps) => component => {
    return (props, ...children) => {
        const state = mapStateToProps(store.getState());
        const mergedProps = {
            ...props,
            ...state,
            dispatch: store.dispatch,
        };
        return component(mergedProps, ...children);
    };
};
