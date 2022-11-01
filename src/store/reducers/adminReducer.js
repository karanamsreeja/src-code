import { adminTypes } from '../types';

const initialState = {
	store: {},
};

export function adminReducer(state = initialState, action) {
	switch (action.type) {
		case adminTypes.storeAdd:
			return {
				...state,
				store: {
					...state.store,
					[action.key]: action.value,
				},
			};
		default:
			return state;
	}
}
