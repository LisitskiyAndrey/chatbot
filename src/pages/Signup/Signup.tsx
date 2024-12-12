import './styles.scss'
import InputField from '../../components/InputField/InputField.tsx'
import { useState } from 'react'
import { RoutPages } from '../../const/routs.tsx'
import { useSignup } from '../../hooks/signupHook.tsx'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner.tsx'
import Snackbar from '../../components/Snackbar/Snackbar.tsx'

const CLASS_NAME = 'signup-page'
const Signup = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { mutate: signup, isLoading } = useSignup()
	const [snackbarVisible, setSnackbarVisible] = useState({ isVisible: false, isSuccess: false, message: 'Success!' })
	const navigate = useNavigate()

	const handleSubmit = () => {
		signup(
			{ name, email, password },
			{
				onSuccess: () => {
					setSnackbarVisible({ isSuccess: true, isVisible: true, message: 'Success!' })
					setTimeout(() => navigate(RoutPages.Login), 3000)
				},
				onError: (error: any) => {
					setSnackbarVisible({
						isSuccess: false,
						isVisible: true,
						message: `${error.response.data.message || error.message || 'Something went wrong'}`
					})
				}
			}
		)
	}
	const handleGoBack = () => navigate(-1)
	return (
		<>
			<Spinner isShown={isLoading}/>
			<div className={`${CLASS_NAME}`}>
				<div className={`${CLASS_NAME}__form`}>
					<div className={`${CLASS_NAME}__header`}>
						<button onClick={handleGoBack} className={`${CLASS_NAME}__back`}>Back</button>
						<span className={`${CLASS_NAME}__label`}>Sign Up</span>
					</div>
					<InputField type="text" placeholder="Name" handleChange={setName} value={name}/>
					<InputField type="text" placeholder="Email" handleChange={setEmail} value={email}/>
					<InputField type="password" placeholder="Password" handleChange={setPassword} value={password}/>

					<button onClick={handleSubmit} type="submit" className={`${CLASS_NAME}__submit`}>
						Sign Up
					</button>
				</div>
			</div>
			{snackbarVisible.isVisible &&
                <Snackbar isSuccess={snackbarVisible.isSuccess} message={snackbarVisible.message}
                          onClose={() => setSnackbarVisible((prev) => ({ ...prev, isVisible: false }))}/>}
		</>
	)
}

export default Signup
