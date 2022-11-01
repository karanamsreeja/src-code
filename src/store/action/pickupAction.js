import { pickupTypes } from '../types';

export const pickupActions = {
	add: (id, payload) => ({ type: pickupTypes.add, id, payload }),
	update: (id, payloads) => ({ type: pickupTypes.update, id, payloads }),
	delete: (id) => ({ type: pickupTypes.delete, id }),
};
