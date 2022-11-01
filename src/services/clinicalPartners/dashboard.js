export function prepareDashboardState(data) {
	let state = {
		received: 0,
		ongoingTest: 0,
		completedTest: 0,
		rejected: 0,
	};

	data.kitsCount.map((e) => {
		switch (e._id) {
			case 'pickup_completed':
				state.received = e.count;
				return true;
			case 'sample_approved':
				state.ongoingTest = e.count;
				return true;
			case 'data_uploaded':
				state.completedTest = e.count;
				return true;
			case 'sample_rejected':
				state.rejected = e.count;
				return true;
			default:
				return true;
		}
	});

	return { ...state, members: data.clinicalDashboard };
}
