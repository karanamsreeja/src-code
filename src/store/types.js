export const authTypes = {
	update: 'auth/update',
	updateCart: 'auth/update_cart',
	set: 'auth/set',
	delete: 'auth/delete',
};

export const helperTypes = {
	update: 'h/update',
	set: 'h/set',
	delete: 'h/delete',
};

export const cartTypes = {
	set: 'crt/set',
	updateCart: 'crt/updateCart',
	deleteItem: 'crt/deleteItem',
	addItem: 'crt/addItem',
	update: 'crt/update',
	clear: 'crt/clear',
	addCoupon: 'crt/addCoupon',
};

export const orderTypes = {
	add: 'order/add',
	update: 'order/update',
	delete: 'order/delete',
};

export const pickupTypes = {
	add: 'pick/add',
	update: 'pick/update',
	delete: 'pick/delete',
};

export const pendingKitTypes = {
	add: 'pkit/add',
	delete: 'pkit/delete',
};

export const storageTypes = {
	add: 'storage/add',
	delete: 'storage/delete',
};

export const adminTypes = {
	setTeamMemberList: 'admin/setMemberList',
	storeAdd: 'admin/storeadd',
};
