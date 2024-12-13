import { ICredentials, login } from '../services/auth.tsx'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

export const useLogin = () => {
	return useMutation(
		{
			mutationFn: (user: ICredentials) => login(user),
			onError: (error) => {
				if (axios.isAxiosError(error) && error.response?.status === 401) {
					console.error('Unauthorized. Please log in again.')
				}
			}
		}
	)
}
