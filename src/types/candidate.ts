export type CriteriaLevel = 'ok' | 'partial' | 'no'

export type CriteriaItem = [level: CriteriaLevel, text: string]

export type ExperienceLevel = [
	period: string,
	company: string,
	role: string,
	duration: string,
]

export type VerdictClass = 'verdict-green' | 'verdict-orange' | 'verdict-red'

export type Verdict = 'ПОДХОДИТ' | 'ЧАСТИЧНО' | 'НЕ СООТВЕТСТВУЕТ'

export type CandidateStatus = 'new' | 'review' | 'invited' | 'rejected'

export const STATUS_LABELS: Record<CandidateStatus, string> = {
	new: 'Новый',
	review: 'На рассмотрении',
	invited: 'Приглашён',
	rejected: 'Отклонён',
}

export const STATUS_FLOW: CandidateStatus[] = [
	'new',
	'review',
	'invited',
	'rejected',
]

export const VERDICT_LABELS: Record<Verdict, string> = {
	ПОДХОДИТ: 'Подходит',
	ЧАСТИЧНО: 'Частично',
	'НЕ СООТВЕТСТВУЕТ': 'Не подходит',
}

export interface Candidate {
	id: string
	name: string
	position: string
	pos_label: string
	file?: string
	email: string
	phone: string | null
	city: string
	tg: string
	exp: ExperienceLevel[]
	total_exp: string
	stack: string
	edu: string
	verdict: Verdict
	vc: VerdictClass
	criteria: CriteriaItem[]
	summary: string
	questions: string[]
	status: CandidateStatus
	createdAt: string
}

export type VerdictFilter = 'all' | Verdict
export type StatusFilter = 'all' | CandidateStatus

export type SortField = 'name' | 'experience' | 'createdAt'
export type SortDirection = 'asc' | 'desc'

export interface CandidateFilters {
	search: string
	verdict: VerdictFilter
	status: StatusFilter
	sortField: SortField
	sortDirection: SortDirection
	page: number
}

export interface UpdateStatusRequest {
	id: string
	status: CandidateStatus
}

export interface UpdateStatusResponse {
	id: string
	status: CandidateStatus
	updatedAt: string
}

export interface ApiError {
	message: string
}
