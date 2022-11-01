import { OrderDateTimeFormatter } from 'helpers/formatter';

export function formatState(data) {
	let state = data.kits.map((e) => ({
		id: e._id,
		fullname: e.patient_id?.firstname + ' ' + e.patient_id?.lastname,
		date: OrderDateTimeFormatter(e.timestamps.data_processing_ended),
	}));

	return state;
}
