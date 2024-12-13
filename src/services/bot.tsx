import axiosInstance from './axiosInstance.tsx'

export interface IChatVariables {
	message: string;
}

export const chat = async (message: IChatVariables) => {
	const response = await axiosInstance.post('/bot', message)
	return response.data
}
