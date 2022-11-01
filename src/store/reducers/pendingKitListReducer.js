import { pendingKitTypes } from '../types';
import initialState from '../initialStates/pendingKitList';

export function pickupReducer(state = initialState, action) {
	switch (action.type) {
		case pendingKitTypes.add:
			return [...state, action.id];

		case pendingKitTypes.delete:
			return state.filter((e) => e !== action.id);
		default:
			return state;
	}
}
