import { orderTypes } from '../types';
import initialState from '../initialStates/order';

export function orderReducer(state = initialState, action) {
	switch (action.type) {
		case orderTypes.add:
			return { ...state, [action.id]: action.payload };

		case orderTypes.update:
			if (!state[action.id]) return state;
			return {
				...state,
				[action.id]: {
					...state[action.id],
					...action.payloads,
				},
			};

		case orderTypes.delete:
			if (!state[action.id]) return state;
			let tempState = { ...state };
			delete tempState[action.id];
			return tempState;
		default:
			return state;
	}
}
