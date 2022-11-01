import { orderTypes } from '../types';

export const orderActions = {
	add: (id, payload) => ({ type: orderTypes.add, id, payload }),
	update: (id, payloads) => ({ type: orderTypes.update, id, payloads }),
	delete: (id) => ({ type: orderTypes.delete, id }),
};
