import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json'
	}
})

axiosInstance.interceptors.request.use(
	(config) => {
		const token = sessionStorage.getItem('authToken')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error)
)
export default axiosInstance
