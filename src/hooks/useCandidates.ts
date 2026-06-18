import { useEffect, useMemo, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import {
	fetchCandidatesThunk,
	selectAllCandidates,
	selectCandidatesError,
	selectCandidatesLoadStatus,
} from '../store/candidatesSlice'
import {
	DEFAULT_PAGE_SIZE,
	selectFilters,
	setPage,
} from '../store/filtersSlice'
import {
	filterCandidates,
	paginateCandidates,
	sortCandidates,
} from '../utils/helpers'
import type { DataSource } from '../services/mockData'

export function useCandidates(source: DataSource = 'default') {
	const dispatch = useAppDispatch()
	const items = useAppSelector(selectAllCandidates)
	const loadStatus = useAppSelector(selectCandidatesLoadStatus)
	const error = useAppSelector(selectCandidatesError)
	const filters = useAppSelector(selectFilters)
	const hasFetched = useRef(false)


	useEffect(() => {
		if (hasFetched.current) return
		hasFetched.current = true
		dispatch(fetchCandidatesThunk(source))
	}, [ dispatch, source])

	const filtered = useMemo(
		() =>
			filterCandidates(items, {
				search: filters.search,
				verdict: filters.verdict,
				status: filters.status,
			}),
		[items, filters.search, filters.verdict, filters.status],
	)

	const sorted = useMemo(
		() => sortCandidates(filtered, filters.sortField, filters.sortDirection),
		[filtered, filters.sortField, filters.sortDirection],
	)

	const totalCount = sorted.length
	const totalPages = Math.max(1, Math.ceil(totalCount / DEFAULT_PAGE_SIZE))

	const paginated = useMemo(
		() => paginateCandidates(sorted, filters.page, DEFAULT_PAGE_SIZE),
		[sorted, filters.page],
	)

	useEffect(() => {
		if (filters.page > totalPages) {
			dispatch(setPage(totalPages))
		}
	}, [filters.page, totalPages, dispatch])

	return {
		candidates: paginated,
		totalCount,
		totalPages,
		loadStatus,
		error,
		filters,
	}
}
