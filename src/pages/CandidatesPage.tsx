import Dashboard from '../components/Dashboard/Dashboard'
import Legend from '../components/Legend/Legend'
import { useUrlFilters } from '../hooks/useUrlFilters'

export default function CandidatesPage() {
	useUrlFilters()

	return (
		<div className='flex gap-4 bg-background p-4 h-screen'>
			<Dashboard />
			<Legend />
		</div>
	)
}
