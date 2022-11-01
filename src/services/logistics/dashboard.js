export function prepareDashboardStateLead(data) {
	let state = {
		pickupRequest: 0,
		assignedPickups: 0,
		inprogress: 0,
		delivered: 0,
		pickup_scheduled: 0,
		pickup_assigned: 0,
		pickup_collected: 0,
		pickup_completed: 0,
	};
	data.ordersCount.map((e) => {
		switch (e._id) {
			case 'dispatch_initiated':
				state.pickupRequest = e.count;
				return true;
			case 'dispatch_assigned':
				state.assignedPickups = e.count;
				return true;
			case 'dispatch_collected':
				state.inprogress = e.count;
				return true;
			case 'dispatch_completed':
				state.delivered = e.count;
				return true;
			default:
				return true;
		}
	});
	data.pickupCount.map((e) => {
		switch (e._id) {
			case 'pickup_scheduled':
				state.pickup_scheduled = e.count;
				return true;
			case 'pickup_assigned':
				state.pickup_assigned = e.count;
				return true;
			case 'pickup_collected':
				state.pickup_collected = e.count;
				return true;
			case 'pickup_completed':
				state.pickup_completed = e.count;
				return true;
			default:
				return true;
		}
	});

	return { ...state, members: data.logisticsMember };
}

export function prepareDashboardState(data) {
	let state = {
		assigned_dispatch: 0,
		inprogress: 0,
		delivered: 0,
		pickup_assigned: 0,
		pickup_collected: 0,
		pickup_completed: 0,
	};
	data.ordersCount.map((e) => {
		switch (e._id) {
			case 'dispatch_assigned':
				state.assigned_dispatch = e.count;
				return true;
			case 'dispatch_collected':
				state.inprogress = e.count;
				return true;
			case 'dispatch_completed':
				state.delivered = e.count;
				return true;
			default:
				return true;
		}
	});
	data.pickupsCount.map((e) => {
		switch (e._id) {
			case 'pickup_assigned':
				state.pickup_assigned = e.count;
				return true;
			case 'pickup_collected':
				state.pickup_collected = e.count;
				return true;
			case 'pickup_completed':
				state.pickup_completed = e.count;
				return true;
			default:
				return true;
		}
	});

	return { ...state, members: data.logisticsMember };
}
