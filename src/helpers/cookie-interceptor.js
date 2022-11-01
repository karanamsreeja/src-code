import axios from 'axios';

export default function cookieInterceptor() {
	axios.interceptors.request.use((request) => {
		// add auth header with jwt if account is logged in and request is to the api url
		const isApiUrl = request.url.startsWith(process.env.REACT_APP_API_BASEURL);

		if (isApiUrl) {
			console.log('add');
			request.withCredentials = true;
		}

		return request;
	});
}
