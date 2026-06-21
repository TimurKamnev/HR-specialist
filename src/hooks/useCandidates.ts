import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import {
	selectAllCandidates,
	selectCandidatesError,
} from '../store/candidatesSlice'
import {
	DEFAULT_PAGE_SIZE,
	selectFilters,
	setPage,
} from '../store/filtersSlice'
import { filterCandidates, sortCandidates } from '../utils/helpers'
import type { DataSource } from '../services/mockData'
import { useCandidatesLoaded } from './useCandidateLoaded'

export function useCandidates(source: DataSource = 'default') {
	const dispatch = useAppDispatch()
	const items = useAppSelector(selectAllCandidates)
	const loadStatus = useCandidatesLoaded(source)
	const error = useAppSelector(selectCandidatesError)
	const filters = useAppSelector(selectFilters)

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

	useEffect(() => {
		if (loadStatus !== 'succeeded') return
		if (filters.page > totalPages) {
			dispatch(setPage(totalPages))
		}
	}, [filters.page, totalPages, dispatch, loadStatus])

	return {
		candidates: sorted,
		totalCount,
		totalPages,
		loadStatus,
		error,
		filters,
	}
}
