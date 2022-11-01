import { createStore, compose } from 'redux';

import rootReducer from './reducers';

export default function configureStore(initialState) {
	// if (process.env.NODE_ENV === 'development') {
	const composerEnhanser =
		(process.env.NODE_ENV === 'development' &&
			typeof window !== 'undefined' &&
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
		compose;
	return createStore(rootReducer, initialState, composerEnhanser);
	// }
	// return createStore(rootReducer, initialState)
}
