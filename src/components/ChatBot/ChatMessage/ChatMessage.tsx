import './styles.scss'
import { FC } from 'react'
import cn from 'classnames'

interface IMessage {
	time: Date;
	text: string;
	sender: 'user' | 'bot';
}

const CLASS_NAME = 'chat-message'

const formatTime = (date: Date) => {
	return date.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true
	})
}
const ChatMessage: FC<IMessage> = ({ time, text, sender }) => {
	return <div className={cn(`${CLASS_NAME}`, `${CLASS_NAME}__${sender}`)}>
		<span>{text}</span>
		<div className={`${CLASS_NAME}__time`}>{formatTime(time)}</div>
	</div>
}

export default ChatMessage
