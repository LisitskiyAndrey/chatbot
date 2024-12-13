import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './styles.scss'
import { useLogin } from '../../hooks/loginHook.tsx'
import { RoutPages } from '../../const/routs.tsx'
import InputField from '../../components/InputField/InputField.tsx'
import Spinner from '../../components/Spinner/Spinner.tsx'
import Snackbar from '../../components/Snackbar/Snackbar.tsx'
import { useRefreshToken } from '../../hooks/refreshHook.tsx'
import { useAuth } from '../../context/AuthContext.tsx'
import { EActions } from '../../const/context.tsx'

const CLASS_NAME = 'login-page'


const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rememberMe, setRememberMe] = useState(false)
	const [snackbarVisible, setSnackbarVisible] = useState({ isVisible: false, isSuccess: false, message: 'Success!' })
	const { mutate: login, isLoading } = useLogin()
	const { dispatch } = useAuth()
	const { mutate: refresh } = useRefreshToken()
	const navigate = useNavigate()

	const handleSignup = () => {
		navigate(RoutPages.Signup)
	}

	const handleSubmit = () => {
		login(
			{ email, password },
			{
				onSuccess: ({ authToken, refreshToken }) => {
					setSnackbarVisible({ isSuccess: true, isVisible: true, message: 'Success!' })
					dispatch({ type: EActions.AddAuth, payload: authToken })
					refresh({ token: refreshToken }, {
						onSuccess: ({ authToken, refreshToken }) => {
							if (refreshToken && authToken) {
								dispatch({ type: EActions.AddAuth, payload: authToken })
								dispatch({ type: EActions.AddRefresh, payload: refreshToken })
							}
						}
					})
					navigate(RoutPages.Home)
				},
				onError: (error: any) => {
					navigate(RoutPages.Login)
					dispatch({ type: EActions.DeleteAuth, payload: null })
					dispatch({ type: EActions.DeleteRefresh, payload: null })
					setSnackbarVisible({
						isSuccess: false,
						isVisible: true,
						message: `${error.message || 'Something went wrong'}`
					})
				}
			}
		)
	}

	return (
		<>
			<Spinner isShown={isLoading}/>
			<div className={`${CLASS_NAME}`}>
				<div className={`${CLASS_NAME}__form`}>
					<div className={`${CLASS_NAME}__header`}>
						<span className={`${CLASS_NAME}__login`}>Login</span>
						<button onClick={handleSignup} className={`${CLASS_NAME}__sign`}>Sign Up</button>
					</div>
					<label className={`${CLASS_NAME}__email`}>
						<InputField isIconPresent={true} type="text" placeholder="Email" handleChange={setEmail}
									value={email}/>
					</label>
					<label className={`${CLASS_NAME}__pass`}>
						<InputField isIconPresent={true} type="password" placeholder="Password"
									handleChange={setPassword}
									value={password}/>
					</label>
					<div className={`${CLASS_NAME}__checkbox`}>
						<input type="checkbox"
							   checked={rememberMe}
							   onChange={(e) => setRememberMe(e.target.checked)}
						/>
						<span>
						Remember Me
					</span>
					</div>
					<button onClick={handleSubmit} type="button" className={`${CLASS_NAME}__submit`}>
						Login
					</button>
					<button type="button" className={`${CLASS_NAME}__forgot`}>Forgot Password?</button>
				</div>
			</div>
			{snackbarVisible.isVisible &&
                <Snackbar isSuccess={snackbarVisible.isSuccess} message={snackbarVisible.message}/>}
		</>
	)
}

export default LoginPage
