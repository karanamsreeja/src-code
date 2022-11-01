import { cartTypes } from '../types';
import initialState from '../initialStates/cart';

export function cartReducer(state = initialState, action) {
	switch (action.type) {
		case cartTypes.updateCart:
			return {
				...state,
				kits: state.kits.map((e, i) => (i === action.index ? { ...e, ...action.value } : e)),
			};

		case cartTypes.update:
			return { ...state, [action.key]: action.value };

		case cartTypes.deleteItem:
			return {
				...state,
				kits: state.kits.filter((e) => e._id !== action.kitId),
				kitIds: state.kitIds.filter((e) => e !== action.kitId),
				price: action.price,
				actual_price: action.actual_price,
				discount: action.actual_price - action.price,
				totalCart: state.totalCart - 1,
			};

		case cartTypes.addItem:
			return {
				...state,
				actual_price: action.actual_price,
				price: action.price,
				discount: action.actual_price - action.price,
				kitIds: action.kitIds,
				totalCart: state.totalCart + 1,
				kits: [...state.kits, { product: action.productId, _id: action.kitIds.slice(-1)[0] }],
			};

		case cartTypes.addCoupon:
			const price = state.actual_price - ((state.actual_price * action.discount) / 100).toFixed(2);

			return {
				...state,
				price,
				discount: state.actual_price - price,
			};

		case cartTypes.set:
			return { ...state, ...action.payloads };

		case cartTypes.clear:
			return initialState;

		default:
			return state;
	}
}
