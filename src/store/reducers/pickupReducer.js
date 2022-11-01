import { pickupTypes } from '../types';
import initialState from '../initialStates/pickup';

export function pickupReducer(state = initialState, action) {
	switch (action.type) {
		case pickupTypes.add:
			return { ...state, [action.id]: action.payload };

		case pickupTypes.update:
			if (!state[action.id]) return state;
			return {
				...state,
				[action.id]: {
					...state[action.id],
					...action.payloads,
				},
			};

		case pickupTypes.delete:
			if (!state[action.id]) return state;
			let tempState = { ...state };
			delete tempState[action.id];
			return tempState;
		default:
			return state;
	}
}
