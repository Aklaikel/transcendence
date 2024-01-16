import axios from 'axios';

const baseURL = process.env.BASE_URL || "http://localhost:8000/";

// const baseURL ="http://e3r5p8.1337.ma:8000/";
// const TOKEN =  `Bearer ${document.cookie.split('=')[1]}`

// const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': TOKEN,
// };


// const axiosInstance = axios.create({
//     baseURL,
//     headers: {
//         ...headers
//     }
// });


// export default axiosInstance;

// const baseURL ="http://e3r2p2.1337.ma:8000/";

axios.defaults.baseURL = baseURL;

// const token = localStorage.getItem('token')
const token =  document.cookie.split('=')[1]

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.defaults.headers.common["Authorization"] = "Bearer " + token;
axios.defaults.headers.common["userId"] =  localStorage.getItem('userId');
// axios.defaults.validateStatus = (status) => status >= 200 && status < 399;

axios.interceptors.request.use(
	async function (config) {
		let accessToken = token;
        cancelToken: source.token
		let isLoggedIn = accessToken ? true : false;
		if (isLoggedIn === true) {
			config.headers.Authorization = await `Bearer ${accessToken}`;
            // config.headers['Content-Type']  = 'multipart/form-data'
			return config;
		} else {
			if (isLoggedIn === false) {
			}
			return config;
		}
	},

	function (error) {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (!error.response) {
		} else {
			if (error.response.status === 401) {
				// window.location.href = "/login";
				// localStorage.clear();
    
				return Promise.reject(error);
			}

			// if (error.response.status === 404 {// TODO }
		}
		return Promise.reject(error);
	}
);

export default axios;

