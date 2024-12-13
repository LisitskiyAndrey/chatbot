import { createContext, Dispatch, FC, ReactNode, useContext, useReducer } from 'react'
import { IRefreshedToken } from '../services/auth.tsx'
import { authReducer } from './Reducer.tsx'
import { Action } from './Actions.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'

export interface IState {
	auth: IRefreshedToken
}

const initialState: IState = {
	auth: {
		authToken: null,
		refreshToken: null
	}
}
const queryClient = new QueryClient()
const AuthContext = createContext<{ state: IState; dispatch: Dispatch<Action> } | undefined>(undefined)
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialState)
	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</AuthContext.Provider>
	)
}
export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
