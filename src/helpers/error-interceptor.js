import axios from 'axios';

export default function errorInterceptor() {
	axios.interceptors.response.use(null, (error) => {
		const { response } = error;
		if (!response) {
			return;
		}

		return response;
	});
}
