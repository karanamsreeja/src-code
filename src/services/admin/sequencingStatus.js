import { OrderDateTimeFormatter } from 'helpers/formatter';

export function formatState(data) {
	let state = data.kits.map((e) => {
		let item = {
			id: e._id,
			fullname: e.patient_id?.firstname+' '+e.patient_id?.lastname,
			date: OrderDateTimeFormatter(e.timestamps.pickup_completed_on),
			btnColor: 'darkBlue',
		};

		if (e.status === 'pickup_completed') {
			item.btnText = 'SAMPLE RECEIVED ';
		} else if (e.status === 'sample_approved') {
			item.btnText = 'SEQUENCING IN PROGRESS';
			item.btnColor = 'light';
		} else if (e.status === 'sample_rejected') {
			item.btnText = 'SAMPLE REJECTED';
		} 
		

		return item;
	});

	return state;
}

