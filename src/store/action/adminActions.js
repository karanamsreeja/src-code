import { adminTypes } from '../types';

export const adminActions = {
	setTeamMemberList: (key, value) => ({ type: adminTypes.setTeamMemberList, key, value }),
	storeAdd: (key, value) => ({ type: adminTypes.storeAdd, key, value }),
};
