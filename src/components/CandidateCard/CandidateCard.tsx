// src/components/CandidateCard/CandidateCard.tsx
import { Link, useLocation } from 'react-router'
import type { Candidate } from '../../types/candidate'
import { StatusBadge } from '../StatusBadge/StatusBadge'
import { VerdictBadge } from '../ui/VerdictBadge/VerdictBadge'
import { formatDate } from '../../utils/helpers'

interface CandidateCardProps {
	candidate: Candidate
}

export function CandidateCard({ candidate }: CandidateCardProps) {
	const location = useLocation()
	return (
		<Link
			to={`/candidate/${candidate.id}`}
			state={{ from: `${location.pathname}${location.search}` }}
			className='block px-3 py-3 hover:bg-background transition-colors'
		>
			<div className='flex lg:hidden items-start gap-3'>
				<div className='flex-1 min-w-0'>
					<p className='font-medium truncate'>{candidate.name}</p>
					<p className='text-sm text-text-muted truncate'>
						{candidate.city} · {candidate.total_exp}
					</p>
					<div className='flex gap-2 mt-2'>
						<VerdictBadge verdict={candidate.verdict} />
						<StatusBadge status={candidate.status} />
					</div>
				</div>
				<span className='text-text-muted' aria-hidden='true'>
					›
				</span>
			</div>

			<div className='hidden lg:grid grid-cols-[2fr_0.8fr_0.6fr_1.5fr_0.9fr_0.9fr_0.9fr_auto] items-center gap-3'>
				<div className='flex items-center gap-3 min-w-0'>
					<div className='min-w-0'>
						<p className='font-medium truncate'>{candidate.name}</p>
						<p className='text-sm text-text-muted truncate'>
							{candidate.pos_label}
						</p>
					</div>
				</div>
				<span className='text-sm'>{candidate.city}</span>
				<span className='text-sm'>{candidate.total_exp}</span>
				<span className='text-sm text-text-muted truncate'>
					{candidate.stack}
				</span>
				<VerdictBadge verdict={candidate.verdict} />
				<StatusBadge status={candidate.status} />
				<span className='text-sm text-text-muted whitespace-nowrap'>
					{formatDate(candidate.createdAt)}
				</span>
				<span className='text-text-muted' aria-hidden='true'>
					›
				</span>
			</div>
		</Link>
	)
}
