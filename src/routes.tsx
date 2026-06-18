import { createBrowserRouter } from 'react-router'
import CandidatesPage from './pages/CandidatesPage'
import NotFound from './pages/NotFound'
import CandidateDetailPage from './pages/CandidateDetailPage'
import App from './App'

export const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				index: true,
				element: <CandidatesPage />,
			},
			{
				path: '/candidate/:id',
				element: <CandidateDetailPage />,
			},
			{ path: '*', element: <NotFound /> },
		],
	},
])
