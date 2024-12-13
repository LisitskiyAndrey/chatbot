import { useMutation } from 'react-query'
import axios from 'axios'
import { refreshToken } from '../services/auth.tsx'

export const useRefreshToken = () => {
	return useMutation(refreshToken, {
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				console.error('Unauthorized. Please log in again.')
			}
		}
	})
}
