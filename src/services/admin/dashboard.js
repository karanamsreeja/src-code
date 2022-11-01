export function prepareDashboardState(data) {
	let state = {
		paid: 0,
		activeOrder: 0,
		orderDeliver: 0,
		pickupsPending: 0,
		sequencinginProgress: 0,
		reportsDelivered: 0,
		teams: {
			logistics: 0,
			ai: 0,
			clinical: 0,
			warehouse: 0,
		},
	};

	data.ordersCount.map((e) => {
		switch (e._id) {
			case 'paid':
				state.paid = e.count;
				return true;
			case 'dispatch_initiated':
			case 'dispatch_assigned':
			case 'dispatch_collected':
				state.activeOrder += e.count;
				return true;
			case 'dispatch_completed':
				state.orderDeliver = e.count;
				return true;
			default:
				return true;
		}
	});

	data.pickupCount.map((e) => {
		switch (e._id) {
			case 'pickup_scheduled':
				state.pickupsPending = e.count;
				return true;
			case 'pickup_assigned':
			case 'pickup_collected':
			case 'pickup_completed':
			case 'sample_approved':
				state.sequencinginProgress += e.count;
				return true;
			case 'reports_uploaded':
				state.reportsDelivered = e.count;
				return true;
			default:
				return true;
		}
	});

	data.memberCount.map((e) => {
		switch (e._id) {
			case 'logistics-lead':
			case 'logistics-member':
				state.teams.logistics += e.count;
				return true;
			case 'ai':
				state.teams.ai = e.count;
				return true;
			case 'clinical':
				state.teams.clinical = e.count;
				return true;
			case 'warehouse':
				state.teams.warehouse = e.count;
				return true;
			default:
				return true;
		}
	});

	return state;
}
