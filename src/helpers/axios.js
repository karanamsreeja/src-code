import axios from 'axios';
import Notification from './notification';

import { reduxStore } from '../index';
import { authActions } from 'store/action/authAction';

export async function axiosPost(url, payload = {}, setloading, onsessionTimeOut) {
	try {
		const res = await axios.post(process.env.REACT_APP_API_BASEURL + url, payload);

		setloading(null);

		if (res.status === 401 || res.status === 403) {
			if (onsessionTimeOut) {
				onsessionTimeOut();
			} else {
				reduxStore.dispatch(authActions.delete(window.location.pathname));
			}
		}
		if (res?.data?.message) {
			if (res.status >= 400) {
				Notification.error(res.data.message);
			} else {
				Notification.success(res.data.message);
			}
		}
		return res;
	} catch (error) {
		setloading(null);
		return { data: null };
	}
}

export async function axiosPut(url, payload = {}, setloading, onsessionTimeOut) {
	try {
		const res = await axios.put(process.env.REACT_APP_API_BASEURL + url, payload);

		setloading(null);

		if (res.status === 401 || res.status === 403) {
			if (onsessionTimeOut) {
				onsessionTimeOut();
			} else {
				reduxStore.dispatch(authActions.delete(window.location.pathname));
			}
		}
		if (res?.data?.message) {
			if (res.status >= 400) {
				Notification.error(res.data.message);
			} else {
				Notification.success(res.data.message);
			}
		}
		return res;
	} catch (error) {
		setloading(null);
		return { data: null };
	}
}

export async function axiosGet(url, payload = {}, setloading, onsessionTimeOut) {
	try {
		const res = await axios.get(process.env.REACT_APP_API_BASEURL + url, { params: payload });

		setloading(null);

		if (res.status === 401 || res.status === 403) {
			if (onsessionTimeOut) {
				onsessionTimeOut();
			} else {
				reduxStore.dispatch(authActions.delete(window.location.pathname));
			}
		}
		if (res?.data?.message) {
			if (res.status >= 400) {
				Notification.error(res.data.message);
			} else {
				Notification.success(res.data.message);
			}
		}
		return res;
	} catch (error) {
		setloading(null);
		return { data: null };
	}
}

export async function axiosDelete(url, payload = {}, setloading, onsessionTimeOut) {
	try {
		const res = await axios.delete(process.env.REACT_APP_API_BASEURL + url, { data: payload });

		setloading(null);

		if (res.status === 401 || res.status === 403) {
			if (onsessionTimeOut) {
				onsessionTimeOut();
			} else {
				reduxStore.dispatch(authActions.delete(window.location.pathname));
			}
		}
		if (res?.data?.message) {
			if (res.status >= 400) {
				Notification.error(res.data.message);
			} else {
				Notification.success(res.data.message);
			}
		}
		return res;
	} catch (error) {
		setloading(null);
		return { data: null };
	}
}

export async function fileupload(url, payload = {}, setloading, onsessionTimeOut) {
	try {
		const res = await axios.put(process.env.REACT_APP_API_BASEURL + url, payload, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			onUploadProgress: (progressEvent) => console.log(progressEvent.loaded),
		});

		setloading(null);

		if (res.status === 401 || res.status === 403) {
			if (onsessionTimeOut) {
				onsessionTimeOut();
			} else {
				reduxStore.dispatch(authActions.delete(window.location.pathname));
			}
		}
		if (res?.data?.message) {
			if (res.status >= 400) {
				Notification.error(res.data.message);
			} else {
				Notification.success(res.data.message);
			}
		}
		return res;
	} catch (error) {
		setloading(null);
		return { data: null };
	}
}

export async function fileDownload(url, onDownloadProgressCallback) {
	try {
		const res = await axios.get(process.env.REACT_APP_API_BASEURL + url, {
			responseType: 'blob',
			onDownloadProgress: (progressEvent) => {
				// const total = parseFloat(progressEvent.currentTarget.responseHeaders['Content-Length']);
				// const current = progressEvent.currentTarget.response.length;
				// onDownloadProgressCallback(Math.floor((current / total) * 100));
			},
		});

		if (res.status === 401 || res.status === 403) {
			reduxStore.dispatch(authActions.delete(window.location.pathname));
		}
		if (res?.data?.message) {
			if (res.status >= 400) {
				Notification.error(res.data.message);
			} else {
				Notification.success(res.data.message);
			}
		}
		return res;
	} catch (error) {
		return { data: null };
	}
}
