import { OrderDateTimeFormatter } from 'helpers/formatter';

export function formatState(data) {
	let state = data.kits.map((e) => {
		let item = {
			id: e._id,
			fullname: e.patient_id?.firstname + ' ' + e.patient_id?.lastname,
			date: OrderDateTimeFormatter(e.timestamps.sample_approved_on),
			btnColor: 'darkBlue',
		};

		if (e.status === 'data_uploaded') {
			item.btnText = 'SEQUENCING DATA  RECEIVED ';
		} else if (e.status === 'data_processing') {
			item.btnText = 'PROCESSING IN PROGRESS';
			item.btnColor = 'light';
		}

		return item;
	});

	return state;
}
