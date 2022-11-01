import { authTypes } from '../types';
const initialState = {
	login: false,
	user: false,
	loading: false,
	cart: {
		address: {},
	},
};

export function authReducer(state = initialState, action) {
	switch (action.type) {
		case authTypes.update:
			return { ...state, [action.key]: action.value };
		case authTypes.updateCart:
			return {
				...state,
				cart: {
					...state.cart,
					[action.key]: action.value,
				},
			};
		case authTypes.set:
			return { ...state, ...action.payloads };
		case authTypes.delete:
			return { ...initialState, redirectUrl: action.redirectUrl };
		default:
			return state;
	}
}
