import type { CriteriaItem, CriteriaLevel } from '../../types/candidate'

const CRITERIA_STYLES: Record<
	CriteriaLevel,
	{ icon: string; className: string }
> = {
	ok: { icon: '✓', className: 'bg-green-100 text-green-600' },
	partial: { icon: '!', className: 'bg-orange-100 text-orange-600' },
	no: { icon: '✕', className: 'bg-red-100 text-red-600' },
}

export function CriteriaCard({ criteria }: { criteria: CriteriaItem[] }) {
	return (
		<div className='bg-white border border-border rounded-lg p-4'>
			<h2 className='text-lg font-bold mb-4'>Критерии оценки</h2>
			<ul className='flex flex-col gap-3'>
				{criteria.map(([level, text], i) => {
					const style = CRITERIA_STYLES[level]
					return (
						<li key={i} className='flex items-start gap-3'>
							<span
								className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${style.className}`}
								aria-hidden='true'
							>
								{style.icon}
							</span>
							<span className='text-sm'>{text}</span>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
