import './styles.scss'
import { FC } from 'react'

const CLASS_NAME = 'spinner'
const Spinner: FC<{ isShown: boolean }> = ({ isShown = false }) => {
	return (
		<>
			{isShown &&
                <div className={`${CLASS_NAME}`}>
                    <div className={`${CLASS_NAME}__circle`}/>
                    <div className={`${CLASS_NAME}__circle`}/>
                    <div className={`${CLASS_NAME}__circle`}/>
                </div>
			}
		</>
	)
}

export default Spinner
