// src/pages/CandidateDetailPage.tsx
import { Link, useLocation, useParams } from 'react-router'
import { useAppSelector } from '../store'
import {
	selectCandidateById,
	selectCandidatesLoadStatus,
} from '../store/candidatesSlice'
import { VerdictBadge } from '../components/ui/VerdictBadge/VerdictBadge'
import { StatusBadge } from '../components/StatusBadge/StatusBadge'
import { StatusSelect } from '../components/CandidateDetail/StatusSelect'
import { StackCard } from '../components/CandidateDetail/StackCard'
import { EducationCard } from '../components/CandidateDetail/EducationCard'
import { SummaryCard } from '../components/CandidateDetail/SummaryCard'
import { CriteriaCard } from '../components/CandidateDetail/CriteriaCard'
import { formatDate } from '../utils/helpers'
import { ContactCard } from '../components/CandidateDetail/ContactCard'
import { ExperienceCard } from '../components/CandidateDetail/ExpirienceCard'
import { QuestionCard } from '../components/CandidateDetail/QuestionCard'

interface BackState {
	from?: string
}

export default function CandidateDetailPage() {
	const { id } = useParams<{ id: string }>()
	const location = useLocation()
	const candidate = useAppSelector(selectCandidateById(id ?? ''))
	const loadStatus = useAppSelector(selectCandidatesLoadStatus)
	const backTo = (location.state as BackState | null)?.from ?? '/'

	if (loadStatus === 'loading' || loadStatus === 'idle') {
		return <div className='p-8 text-center text-text-muted'>Загрузка...</div>
	}

	if (!candidate) {
		return (
			<div className='p-8 text-center'>
				<h1 className='text-2xl font-bold mb-2'>Кандидат не найден</h1>
				<p className='text-text-muted mb-4'>
					Возможно, ссылка устарела или кандидат был удалён.
				</p>
				<Link to='/' className='text-primary-500 hover:underline'>
					← Назад к списку
				</Link>
			</div>
		)
	}

	return (
		<div className='bg-background p-4 min-h-screen'>
			<Link
				to={backTo}
				className='inline-flex items-center gap-1 text-sm text-text-muted hover:text-text mb-4'
			>
				← Назад к списку
			</Link>

			<header className='bg-white border border-border rounded-lg p-5 mb-4 flex flex-wrap items-start justify-between gap-4'>
				<div>
					<div className='flex items-center gap-3 flex-wrap'>
						<h1 className='text-2xl font-bold'>{candidate.name}</h1>
						<StatusBadge status={candidate.status} />
					</div>
					<p className='text-text-muted'>{candidate.pos_label}</p>
					<dl className='flex flex-wrap gap-6 mt-4 text-sm'>
						<div>
							<dt className='text-text-muted'>Опыт работы</dt>
							<dd className='font-medium'>{candidate.total_exp}</dd>
						</div>
						<div>
							<dt className='text-text-muted'>Город</dt>
							<dd className='font-medium'>{candidate.city}</dd>
						</div>
						<div>
							<dt className='text-text-muted'>Добавлен</dt>
							<dd className='font-medium'>{formatDate(candidate.createdAt)}</dd>
						</div>
						<div>
							<dt className='text-text-muted'>Вердикт</dt>
							<dd>
								<VerdictBadge verdict={candidate.verdict} />
							</dd>
						</div>
					</dl>
				</div>
				<div className='w-full sm:w-56'>
					<StatusSelect
						candidateId={candidate.id}
						currentStatus={candidate.status}
					/>
				</div>
			</header>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
				<div className='flex flex-col gap-4'>
					<ContactCard candidate={candidate} />
				</div>
				<div className='flex flex-col gap-4'>
					<ExperienceCard exp={candidate.exp} />
					<StackCard stack={candidate.stack} />
					<EducationCard edu={candidate.edu} />
					<SummaryCard summary={candidate.summary} />
				</div>
				<div className='flex flex-col gap-4'>
					<CriteriaCard criteria={candidate.criteria} />
					<QuestionCard questions={candidate.questions} />
				</div>
			</div>
		</div>
	)
}
