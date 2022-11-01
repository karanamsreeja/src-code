import cartState from 'store/initialStates/cart';
import orderState from 'store/initialStates/order';
import pickupState from 'store/initialStates/pickup';

const defaultState = {
	auth: {
		login: false,
		user: false,
		loading: true,
	},
	cart: cartState,
	order: orderState,
	pickup: pickupState,
};

export default defaultState;
