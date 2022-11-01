import { authTypes } from '../types';

export const authActions = {
	set: (payloads) => ({ type: authTypes.set, payloads }),
	update: (key, value) => ({ type: authTypes.update, key, value }),
	updateCart: (key, value) => ({ type: authTypes.updateCart, key, value }),
	delete: (redirectUrl = null) => ({ type: authTypes.delete, redirectUrl }),
};
