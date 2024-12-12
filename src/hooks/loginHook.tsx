import { useMutation } from 'react-query'
import { login } from '../services/auth.tsx'
import axios from 'axios'

export const useLogin = () => {
	return useMutation(login, {
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				console.error('Unauthorized. Please log in again.')
			}
		}
	})
}
