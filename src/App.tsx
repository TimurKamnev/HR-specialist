import { Outlet } from 'react-router'
import { ToastProvider } from './components/ui/Toast/Toast'
import { useCandidatesLoaded } from './hooks/useCandidateLoaded'

function App() {
	useCandidatesLoaded()

	return (
		<ToastProvider>
			<main className='min-h-screen'>
				<Outlet />
			</main>
		</ToastProvider>
	)
}

export default App
