import './styles.scss'
import { FC, Fragment, useEffect, useRef } from 'react'
import { IChatbotMessage } from '../../../../pages/Chat/ChatBot.tsx'
import ChatMessage from '../../ChatMessage/ChatMessage.tsx'

const CLASS_NAME = 'modal-body'

const ModalBody: FC<{ messages: IChatbotMessage[] }> = ({ messages }) => {
	const containerRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const container = containerRef?.current
		if (container) {
			container.scrollTop = container.scrollHeight
		}
	}, [messages])

	return <div className={`${CLASS_NAME}`}>
		<div ref={containerRef} className={`${CLASS_NAME}__messages`}>
			{messages?.map((message, index) => (
				<Fragment key={`${message.user}_${index}`}>
					<ChatMessage sender={'user'} time={new Date()} text={message.user}/>
					<ChatMessage sender={'bot'} time={new Date()} text={message.bot}/>
				</Fragment>
			))}
		</div>
	</div>
}

export default ModalBody
