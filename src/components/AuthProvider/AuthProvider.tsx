import { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'


const queryClient = new QueryClient()
const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}

export default AuthProvider
