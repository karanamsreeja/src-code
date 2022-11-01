import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { cartReducer } from './cartReducer';
import { orderReducer } from './orderReducer';
import { pickupReducer } from './pickupReducer';
import { storageReducer } from './storageReducer';
import { adminReducer } from './adminReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	cart: cartReducer,
	order: orderReducer,
	pickup: pickupReducer,
	storage: storageReducer,
	admin: adminReducer,
});

export default rootReducer;
