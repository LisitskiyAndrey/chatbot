import { FC, useEffect, useState } from 'react'
import './styles.scss'
import cn from 'classnames'

const CLASS_NAME = 'snackbar'

interface ISnackbarProps {
	isSuccess: boolean
	message: string;
	duration?: number;
	onClose?: () => void;
}

const Snackbar: FC<ISnackbarProps> = ({ message, duration = 2000, onClose, isSuccess }) => {
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		setIsVisible(true)

		const timer = setTimeout(() => {
			setIsVisible(false)
			if (onClose) onClose()
		}, duration)

		return () => clearTimeout(timer)
	}, [message, duration, onClose])

	return isVisible && <div className={cn(`${CLASS_NAME}`, !isSuccess && `${CLASS_NAME}_failed`)}>{message}</div>
}

export default Snackbar
