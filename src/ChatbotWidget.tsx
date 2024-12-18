import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage.tsx'
import { RoutPages } from './const/routs.tsx'
import ChatBot from './pages/Chat/ChatBot.tsx'
import Signup from './pages/Signup/Signup.tsx'
import ProtectedRoute from './services/ProtectedRoute.tsx'
import { useAuth } from './context/AuthContext.tsx'
import { memo } from 'react'


const AppPages = [
	{ path: RoutPages.Other, element: <LoginPage/>, isProtectedRoute: false },
	{ path: RoutPages.Login, element: <LoginPage/>, isProtectedRoute: false },
	{ path: RoutPages.Home, element: <ChatBot/>, isProtectedRoute: true },
	{ path: RoutPages.Signup, element: <Signup/>, isProtectedRoute: false }
]

const ChatbotWidget = memo(() => {
	const { state: { auth: { authToken } } } = useAuth()

	return (
		<Router>
			<Routes>
				{AppPages.map((page, index) => (
					page.isProtectedRoute ?
						<Route key={`${page}_${index}`}
							   element={<ProtectedRoute isAuthenticated={!!authToken}/>}>
							<Route path={page.path} element={page.element}/>
						</Route> :
						<Route key={`${page}_${index}`} path={page.path} element={page.element}/>
				))}
			</Routes>
		</Router>
	)
})
export default ChatbotWidget
