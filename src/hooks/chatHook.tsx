import { useMutation } from 'react-query'
import axios from 'axios'
import { chat } from '../services/bot.tsx'

export const useChat = () => {
	return useMutation(chat, {
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				console.error('Unauthorized. Please log in again.')
			}
		}
	})
}
