import { OrderDateTimeFormatter } from 'helpers/formatter';

export function formatState(data) {
	let state = data.orders.map((e) => {
		let item = {
			id: e._id,
			fullname: e.user?.fullname,
			date: OrderDateTimeFormatter(e.ordered_on),
			btnColor: 'darkBlue',
		};

		if (e.status === 'paid') {
			item.btnText = 'PICKUP PENDING';
		} else if (e.status === 'dispatch_paused') {
			item.btnText = 'PICKUP PAUSED';
			item.btnColor = 'light';
		} else if (e.status === 'dispatch_assigned') {
			item.btnText = 'PICKUP ASSIGNED';
		} else if (e.status === 'dispatch_collected') {
			item.btnText = 'PICKUP COLLECTED';
		} else if (e.status === 'dispatch_completed') {
			item.btnText = 'ORDER DELIVERED';
		} else if (e.status === 'dispatch_initiated') {
			item.btnText = 'PACKAGING IN PROGRESS';
		}

		return item;
	});

	return state;
}
