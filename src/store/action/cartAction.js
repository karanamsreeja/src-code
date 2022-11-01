import { cartTypes } from '../types';

export const cartActions = {
	set: (payloads) => ({ type: cartTypes.set, payloads }),
	deleteItem: (kitId, actual_price, price) => ({ type: cartTypes.deleteItem, kitId, actual_price, price }),
	addItem: (actual_price, price, kitIds, productId) => ({ type: cartTypes.addItem, actual_price, price, kitIds, productId }),
	updateCart: (index, value) => ({ type: cartTypes.updateCart, index, value }),
	addCoupon: (discount) => ({ type: cartTypes.addCoupon, discount }),
	update: (key, value) => ({ type: cartTypes.update, key, value }),
	clear: () => ({ type: cartTypes.clear }),
};
