import { useMutation } from 'react-query'
import { signUp } from '../services/auth.tsx'
import axios from 'axios'

export const useSignup = () => {
	return useMutation(signUp, {
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				console.error('Unauthorized. Please log in again.')
			}
		}
	})
}
