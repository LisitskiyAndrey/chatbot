import React, { FC, useState } from 'react'
import './styles.scss'

const CLASS_NAME = 'modal-footer'


const ModalFooter: FC<{ onClickSendData: (message: string) => void }> = ({ onClickSendData }) => {
	const [inputValue, setInputValue] = useState('')

	const handleSubmit = () => {
		if (inputValue.trim().length) {
			onClickSendData(inputValue)
			setInputValue('')
		}
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	};
	return (
		<div className={`${CLASS_NAME}`}>
			<input onKeyDown={handleKeyDown} value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text"
				   placeholder={'Type your message...'} className={`${CLASS_NAME}__input`}/>
			<button type="submit" onClick={handleSubmit} className={`${CLASS_NAME}__submit`}/>
		</div>
	)
}

export default ModalFooter
