// src/components/CandidateDetail/ExperienceCard.tsx
import type { Candidate } from '../../types/candidate'

export function ExperienceCard({ exp }: { exp: Candidate['exp'] }) {
	return (
		<div className='bg-white border border-border rounded-lg p-4'>
			<h2 className='text-lg font-bold mb-4'>Опыт работы</h2>
			<ol className='flex flex-col gap-4'>
				{exp.map(([period, company, role, duration], i) => (
					<li key={i} className='pl-4 border-l-2 border-primary-300/40'>
						<p className='text-sm text-text-muted'>{period}</p>
						<p className='font-medium'>{company}</p>
						<p className='text-sm text-text-muted'>
							{role} · {duration}
						</p>
					</li>
				))}
			</ol>
		</div>
	)
}
