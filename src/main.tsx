import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import ChatbotWidget from './ChatbotWidget.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<ChatbotWidget/>
		</AuthProvider>
	</StrictMode>
)
