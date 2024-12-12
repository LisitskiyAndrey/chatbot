import './styles.scss'
import { FC } from 'react'
import cn from 'classnames'

interface IInputField {
	type: 'text' | 'password'
	placeholder: string
	value: string
	handleChange: (value: string) => void
	isIconPresent?: boolean
}

const CLASS_NAME = 'input-field'
const InputField: FC<IInputField> = ({ type, placeholder, value, handleChange, isIconPresent }) => {
	return (
		<input
			className={cn(`${CLASS_NAME}`, `${isIconPresent ? `${CLASS_NAME}__icon` : ''}`)}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={(e) => handleChange(e.target.value)}
		/>
	)
}
export default InputField
