import CardInfo from '../components/CardInfo/CardInfo'
import Dashboard from '../components/Dashboard/Dashboard'

export default function CandidatesPage() {
	return (
		<div className='flex gap-4 bg-background p-4 min-h-[inherit]'>
			<Dashboard />
			<CardInfo />
		</div>
	)
}
