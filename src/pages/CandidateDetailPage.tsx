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

			<header className='bg-white border border-border rounded-lg p-5 mb-2 flex flex-wrap items-start justify-between gap-6'>
				<div className='flex flex-col gap-4 flex-1 lg:flex-0'>
					<ContactCard candidate={candidate} />
				</div>
				<div className='border-y border-y-border lg:border-none py-3'>
					<div className='flex items-center sm:gap-3 flex-wrap mb-4'>
						<h1 className='text-2xl font-bold mb-2'>{candidate.name}</h1>
						<StatusBadge status={candidate.status} />
					</div>
					<p className='text-text-muted'>{candidate.pos_label}</p>
					<dl className='flex flex-wrap gap-4 md:gap-8 mt-4 text-sm'>
						<div className='flex items-start gap-3'>
							<span className='bg-gray-100 p-2 rounded-xl'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									className='size-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z'
									/>
								</svg>
							</span>
							<div>
								<dt className='text-text-muted mb-2'>Опыт работы</dt>
								<dd className='font-medium'>{candidate.total_exp}</dd>
							</div>
						</div>
						<div className='flex items-start gap-3'>
							<span className='bg-gray-100 p-2 rounded-xl'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									className='size-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5'
									/>
								</svg>
							</span>
							<div>
								<dt className='text-text-muted mb-2'>Добавлен</dt>
								<dd className='font-medium'>
									{formatDate(candidate.createdAt)}
								</dd>
							</div>
						</div>
						<div>
							<dt className='text-text-muted mb-2'>Вердикт</dt>
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
				<div className='flex flex-col gap-2'>
					<ExperienceCard exp={candidate.exp} />
					<EducationCard edu={candidate.edu} />
				</div>
				<div className='flex flex-col gap-2'>
					<StackCard stack={candidate.stack} />
					<SummaryCard summary={candidate.summary} />
					<QuestionCard questions={candidate.questions} />
				</div>
				<CriteriaCard criteria={candidate.criteria} />
			</div>
		</div>
	)
}
