import { pendingKitTypes } from '../types';

export const pickupActions = {
	add: (id) => ({ type: pendingKitTypes.add, id }),
	delete: (id) => ({ type: pendingKitTypes.delete, id }),
};
