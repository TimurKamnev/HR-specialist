import type { Candidate } from '../../types/candidate'
import { CandidateCard } from '../CandidateCard/CandidateCard'

interface CandidateListProps {
	candidates: Candidate[]
	isLoading: boolean
	error: string | null
}

export function CandidateList({
	candidates,
	isLoading,
	error,
}: CandidateListProps) {
	if (isLoading) {
		return (
			<div className='py-12 text-center text-text-muted' role='status'>
				Загрузка кандидатов...
			</div>
		)
	}

	if (error) {
		return (
			<div className='py-12 text-center text-red-600' role='alert'>
				{error}
			</div>
		)
	}

	if (candidates.length === 0) {
		return (
			<div className='py-12 text-center text-text-muted'>
				По заданным фильтрам кандидаты не найдены
			</div>
		)
	}

	return (
		<div aria-label='Список кандидатов'>
			<div className='hidden md:grid grid-cols-[2fr_0.8fr_0.6fr_1.5fr_0.9fr_0.9fr_0.9fr_auto] gap-3 px-3 py-2 text-sm text-text-muted border-b border-border'>
				<span>Кандидат</span>
				<span>Город</span>
				<span>Опыт</span>
				<span>Стек</span>
				<span>Вердикт</span>
				<span>Статус</span>
				<span>Добавлен</span>
				<span aria-hidden='true' />
			</div>
			<ul className='divide-y divide-border'>
				{candidates.map(candidate => (
					<li key={candidate.id}>
						<CandidateCard candidate={candidate} />
					</li>
				))}
			</ul>
		</div>
	)
}
