import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes'
import { Provider } from 'react-redux'
import { store } from './store'
import { ToastProvider } from './components/ui/Toast/Toast'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<ToastProvider>
				<RouterProvider router={router} />
			</ToastProvider>
		</Provider>
	</StrictMode>,
)
