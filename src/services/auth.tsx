import axiosInstance from './axiosInstance.tsx'

export interface ICredentials {
	email: string;
	password: string
}

interface IUserInfo extends ICredentials {
	name: string
}

export const login = async (credentials: ICredentials) => {
	const response = await axiosInstance.post('/auth/login', credentials)
	return response.data
}

export const signUp = async (data: IUserInfo) => {
	const response = await axiosInstance.post('/auth/signup', data)
	return response.data
}
