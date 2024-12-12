import { FC, useState } from 'react'
import './styles.scss'
import ChatModal from '../../components/ChatBot/ChatModal/ChatModal.tsx'
import ModalHeader from '../../components/ChatBot/Modal/ModalHeader/ModalHeader.tsx'
import ModalFooter from '../../components/ChatBot/Modal/ModalFooter/ModalFooter.tsx'
import { useChat } from '../../hooks/chatHook.tsx'
import { RoutPages } from '../../const/routs.tsx'
import { useNavigate } from 'react-router-dom'
import Snackbar from '../../components/Snackbar/Snackbar.tsx'
import ModalBody from '../../components/ChatBot/Modal/ModalBody/ModalBody.tsx'

export interface IChatbotMessage {
	user: string,
	bot: string
}

const CLASS_NAME = 'chatbot'
const ChatBot: FC = () => {
	const [messages, setMessages] = useState<IChatbotMessage[]>([])
	const { mutate: chat } = useChat()
	const navigate = useNavigate()
	const [snackbarVisible, setSnackbarVisible] = useState({ isVisible: false, isSuccess: false, message: 'Success!' })
	const handleSubmit = (message: string) => {
		setMessages([...messages, { user: message, bot: '' }])
		chat({ message },
			{
				onSuccess: ({ response: { result } }) => {
					setMessages([...messages, { user: message, bot: result[0].generated_text }])
				},
				onError: (error: any) => {

					setSnackbarVisible({
						isSuccess: false,
						isVisible: true,
						message: `${error.message || 'Something went wrong'}`
					})
					setTimeout(() => navigate(RoutPages.Login), 3000)
				}
			}
		)
	}

	const handleClose = () => {
		navigate(RoutPages.Login)
	}
	return (
		<div className={`${CLASS_NAME}`}>
			<ChatModal>
				<ModalHeader onClick={() => handleClose()} title={'Smart Assistant'}/>
				<ModalBody messages={messages}/>
				<ModalFooter onClickSendData={handleSubmit}/>
			</ChatModal>
			{snackbarVisible.isVisible &&
                <Snackbar isSuccess={snackbarVisible.isSuccess} message={snackbarVisible.message}/>}
		</div>
	)
}

export default ChatBot
