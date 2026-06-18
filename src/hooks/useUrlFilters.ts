import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../store'
import { hydrateFromUrl, selectFilters } from '../store/filtersSlice'
import type {
	CandidateFilters,
	SortDirection,
	SortField,
	StatusFilter,
	VerdictFilter,
} from '../types/candidate'

function parseFiltersFromParams(params: URLSearchParams): CandidateFilters {
	return {
		search: params.get('search') ?? '',
		verdict: (params.get('verdict') as VerdictFilter) ?? 'all',
		status: (params.get('status') as StatusFilter) ?? 'all',
		sortField: (params.get('sortField') as SortField) ?? 'createdAt',
		sortDirection: (params.get('sortDirection') as SortDirection) ?? 'desc',
		page: Number(params.get('page')) || 1,
	}
}

function filtersToParams(filters: CandidateFilters): URLSearchParams {
	const params = new URLSearchParams()
	if (filters.search) params.set('search', filters.search)
	if (filters.verdict !== 'all') params.set('verdict', filters.verdict)
	if (filters.status !== 'all') params.set('status', filters.status)
	if (filters.sortField !== 'createdAt')
		params.set('sortField', filters.sortField)
	if (filters.sortDirection !== 'desc')
		params.set('sortDirection', filters.sortDirection)
	if (filters.page !== 1) params.set('page', String(filters.page))
	return params
}

export function useUrlFilters() {
	const [searchParams, setSearchParams] = useSearchParams()
	const dispatch = useAppDispatch()
	const filters = useAppSelector(selectFilters)
	const isHydrated = useRef(false)

	useEffect(() => {
		dispatch(hydrateFromUrl(parseFiltersFromParams(searchParams)))
		isHydrated.current = true
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (!isHydrated.current) return
		setSearchParams(filtersToParams(filters), { replace: true })
	}, [filters, setSearchParams])
}
