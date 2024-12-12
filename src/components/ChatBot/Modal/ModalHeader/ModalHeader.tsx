import { FC } from 'react'
import './styles.scss'

const CLASS_NAME = 'modal-header'
const ModalHeader: FC<{ title: string, onClick: () => void}> = ({ title, onClick }) => {
	return (
		<div className={`${CLASS_NAME}`}>
			<div className={`${CLASS_NAME}__title`}>{title}</div>
			<button onClick={onClick} className={`${CLASS_NAME}__close`} />
		</div>
	)
}

export default ModalHeader
