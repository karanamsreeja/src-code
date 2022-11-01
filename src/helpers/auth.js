import axios from 'axios';
import Notification from './notification';
import { axiosPost, axiosGet } from './axios';

import { reduxStore } from '../index';
import { authActions } from 'store/action/authAction';

const emptyFn = () => {};

const mapRole = (role) => {
	switch (role) {
		case 'client':
			return { user: true, redirectUrl: '/user/dashboard' };

		case 'warehouse':
			return { warehouse: true, redirectUrl: '/warehouse' };

		case 'logistics-lead':
			return { logistics: true, logisticsLead: true, redirectUrl: '/logistics' };

		case 'logistics-member':
			return { logistics: true, logisticsLead: false, redirectUrl: '/logistics' };

		case 'admin':
			return { admin: true, redirectUrl: '/admin' };

		case 'clinical':
			return { clinical: true, redirectUrl: '/clinical-partners' };

		case 'ai':
			return { aiTeam: true, redirectUrl: '/ai-team' };

		default:
			return {};
	}
};

const logout = async () => {
	const res = await axiosGet('/auth/logout', {}, emptyFn);
	if (res.status === 200) {
		reduxStore.dispatch(authActions.delete());
	}
};

const login = async (email, password, setloading, silentCheck = false) => {
	try {
		const res = await axios.post(`${process.env.REACT_APP_API_BASEURL}/auth/login`, { email, password });
		setloading(null);

		let obj = { data: {} };
		obj.status = res.status;

		// alert message
		if (!silentCheck) {
			if (res.data?.message) {
				if (res.status === 200) {
					Notification.success(res.data.message || 'Login successfull.');
				} else {
					Notification.error(res.data.message);
				}
			} else {
				Notification.error('Something went wrong.');
			}
		}

		// prepair data
		if (res.status === 200) {
			obj.data = { ...mapRole(res.data.user.role), loading: false, login: true, email: res.data.user.email, fullname: res.data.user.fullname };
		}

		return obj;
	} catch (error) {
		setloading(null);
		return { data: {} };
	}
};

const checkLogin = async () => {
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_BASEURL}/auth/login/success`);
		if (res.status === 200) {
			let permissions = mapRole(res.data.user.role);

			reduxStore.dispatch(
				authActions.set({
					loading: false,
					login: true,
					email: res.data?.user.email,
					fullname: res.data?.user.fullname,
					...permissions,
				})
			);
		} else {
			reduxStore.dispatch(authActions.update('loading', false));
		}
	} catch (error) {
		reduxStore.dispatch(authActions.update('loading', false));
	}
};

const updateProfileName = async (details, onSessionTimeOutRedirect, disableloading = emptyFn) => {
	const res = await axiosPost('/users/profile', details, disableloading, () => reduxStore.dispatch(authActions.delete(onSessionTimeOutRedirect)));

	if (res.status === 200) {
		reduxStore.dispatch(authActions.update('fullname', [details.firstname, details.lastname].join(' ')));
	}
};

export { logout, login, checkLogin, updateProfileName };

// {
//     "email": "imsoumyadeepdutta@gmail.com",
//     "password": "abcd1234"
// }
