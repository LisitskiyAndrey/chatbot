import { FC, ReactNode } from 'react'
import './styles.scss'

const CLASS_NAME = 'chat-modal'
const ChatModal: FC<{ children: ReactNode }> = ({ children }) => {
	return <div className={`${CLASS_NAME}`}>{children}</div>
}

export default ChatModal
