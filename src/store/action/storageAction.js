import { storageTypes } from '../types';

export const storageActions = {
	add: (id, payload) => ({ type: storageTypes.add, id, payload }),
	delete: (id) => ({ type: storageTypes.delete, id }),
};
