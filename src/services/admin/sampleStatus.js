import { OrderDateTimeFormatter } from 'helpers/formatter';

export function formatState(data) {
	let state = data.pickups.map((e) => {
		let item = {
			id: e._id,
			fullname: e.user?.fullname,
			date: OrderDateTimeFormatter(e.date),
			btnColor: 'darkBlue',
		};

		if (e.status === 'pickup_scheduled') {
			item.btnText = 'REQUEST RAISED';
		} else if (e.status === 'pickup_assigned') {
			item.btnText = 'PICKUP PENDING';
			item.btnColor = 'light';
		} else if (e.status === 'pickup_collected') {
			item.btnText = 'PICKUP IN PROGRESS';
		} else if (e.status === 'pickup_completed') {
			item.btnText = 'PICKUP DELIVERED';
		}

		return item;
	});

	return state;
}
