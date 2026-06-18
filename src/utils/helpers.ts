import type {
	Candidate,
	CandidateFilters,
	SortDirection,
	SortField,
} from '../types/candidate'

export type FilterCriteria = Pick<
	CandidateFilters,
	'search' | 'verdict' | 'status'
>

export function parseExperienceYears(totalExp: string): number {
	const match = totalExp.match(/(\d+(?:\.\d+)?)/)
	return match ? Number(match[1]) : 0
}

export function filterCandidates(
	candidates: Candidate[],
	{ search, verdict, status }: FilterCriteria,
): Candidate[] {
	const normalizedSearch = search.trim().toLowerCase()

	return candidates.filter(candidate => {
		const matchesSearch =
			normalizedSearch === '' ||
			candidate.name.toLowerCase().includes(normalizedSearch)
		const matchesVerdict = verdict === 'all' || candidate.verdict === verdict
		const matchesStatus = status === 'all' || candidate.status === status
		return matchesSearch && matchesVerdict && matchesStatus
	})
}

export function sortCandidates(
	candidates: Candidate[],
	field: SortField,
	direction: SortDirection,
): Candidate[] {
	const multiplier = direction === 'asc' ? 1 : -1

	// .slice() — не мутируем входной массив, он может быть мемоизированным результатом filterCandidates
	return candidates.slice().sort((a, b) => {
		switch (field) {
			case 'name':
				return a.name.localeCompare(b.name, 'ru') * multiplier
			case 'experience':
				return (
					(parseExperienceYears(a.total_exp) -
						parseExperienceYears(b.total_exp)) *
					multiplier
				)
			case 'createdAt':
				return (
					(new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
					multiplier
				)
			default:
				return 0
		}
	})
}

export function paginateCandidates(
	candidates: Candidate[],
	page: number,
	pageSize: number,
): Candidate[] {
	const start = (page - 1) * pageSize
	return candidates.slice(start, start + pageSize)
}
