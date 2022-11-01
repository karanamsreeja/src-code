export function prepareDashboardState(data) {
	let state = {
		data_uploaded: 0,
		data_processing: 0,
		reports_uploaded: 0,
	};

	data.kitsCount.map((e) => {
		switch (e._id) {
			case 'data_uploaded':
				state.data_uploaded = e.count;
				return true;
			case 'data_processing':
				state.data_processing = e.count;
				return true;
			case 'reports_uploaded':
				state.reports_uploaded = e.count;
				return true;
			default:
				return true;
		}
	});

	return { ...state, members: data.aiMembers };
}
