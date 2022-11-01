import { storageTypes } from '../types';
import initialState from '../initialStates/storage';

export function storageReducer(state = initialState, action) {
	switch (action.type) {
		case storageTypes.add:
			return { ...state, [action.id]: action.payload };

		case storageTypes.delete:
			if (!state[action.id]) return state;
			let tempState = { ...state };
			delete tempState[action.id];
			return tempState;
		default:
			return state;
	}
}
