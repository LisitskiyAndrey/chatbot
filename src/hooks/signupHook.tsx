import { IUserInfo, signUp } from '../services/auth.tsx'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

export const useSignup = () => {
	return useMutation(
		{
			mutationFn: (user: IUserInfo) => signUp(user),
			onError: (error) => {
				if (axios.isAxiosError(error) && error.response?.status === 401) {
					console.error('Unauthorized. Please log in again.')
				}
			}
		}
	)
}
