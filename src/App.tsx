import { Outlet } from 'react-router'
import { ToastProvider } from './components/ui/Toast/Toast'
import { useCandidatesLoaded } from './hooks/useCandidateLoaded'
import { getStoredDataSource } from './utils/dataSourcePerormance'

const initialDataSource = getStoredDataSource()

function App() {
	useCandidatesLoaded(initialDataSource)

	return (
		<ToastProvider>
			<main className='min-h-screen'>
				<Outlet />
			</main>
		</ToastProvider>
	)
}

export default App
