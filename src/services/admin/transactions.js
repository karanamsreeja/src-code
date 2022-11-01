import { OrderDateFormatter } from 'helpers/formatter';

export function formatState(data) {
	let state = data.payment.map((e) => ({
		id: e._id,
		fullname: e.order.user.fullname,
		date: OrderDateFormatter(e.order.ordered_on),
		amount: e.razorpay.amount / 100,
		paymentMethod: 'Demo',
		btnColor: e.status === 'success' ? 'lightGreen' : 'lightRed',
		btnText: e.status || 'daskd',
	}));

	return state;
}
