import axiosInstance from './axiosInstance.tsx'

export const chat = async (message: { message: string }) => {
	const response = await axiosInstance.post('/bot', message)
	return response.data
}
