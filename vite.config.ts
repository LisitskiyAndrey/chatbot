import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'ChatbotWidget',
			fileName: (format) => `chatbot-widget.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					'react-router-dom': 'ReactRouterDOM',
					'@tanstack/react-query': 'ReactQuery',
				},
			},
		},
	},
})
