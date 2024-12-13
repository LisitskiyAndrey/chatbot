import axios from 'axios'
import { IToken, refreshToken } from '../services/auth.tsx'
import { useMutation } from '@tanstack/react-query'

export const useRefreshToken = () => {
	return useMutation(
		{
			mutationFn: (token: IToken) => refreshToken(token),
			onError: (error) => {
				if (axios.isAxiosError(error) && error.response?.status === 401) {
					console.error('Unauthorized. Please log in again.')
				}
			}
		}
	)
}
