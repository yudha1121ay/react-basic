import { createStore } from 'redux';
import { Reducer, initState } from './reducer';

export const configStore = () => {
    const store = createStore(
        Reducer,
        initState
    )

    return store;
}