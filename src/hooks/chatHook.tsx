import axios from 'axios'
import { chat, IChatVariables } from '../services/bot.tsx'
import { useMutation } from '@tanstack/react-query'


export const useChat = () => {
	return useMutation(
		{
			mutationFn: (user: IChatVariables) => chat(user),
			onError: (error) => {
				if (axios.isAxiosError(error) && error.response?.status === 401) {
					console.error('Unauthorized. Please log in again.')
				}
			}
		}
	)
}
