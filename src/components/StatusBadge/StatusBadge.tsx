import { STATUS_LABELS, type CandidateStatus } from '../../types/candidate'

const STATUS_STYLES: Record<CandidateStatus, string> = {
	new: 'bg-primary-300/20 text-primary-500',
	review: 'bg-warning-500/20 text-amber-600',
	invited: 'bg-purple-500/20 text-purple-700',
	rejected: 'bg-text-muted/20 text-gray-600',
}

interface StatusBadgeProps {
	status: CandidateStatus
	isUpdating?: boolean
}

export function StatusBadge({ status, isUpdating = false }: StatusBadgeProps) {
	return (
		<span
			className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium whitespace-nowrap ${STATUS_STYLES[status]}`}
		>
			{isUpdating && (
				<span
					className='w-2.5 h-2.5 rounded-full border-2 border-current border-t-transparent animate-spin'
					aria-hidden='true'
				/>
			)}
			{STATUS_LABELS[status]}
		</span>
	)
}
