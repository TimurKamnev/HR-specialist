import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import {
	fetchCandidatesThunk,
	selectCandidatesLoadStatus,
} from '../store/candidatesSlice'
import type { DataSource } from '../services/mockData'

export function useCandidatesLoaded(source: DataSource = 'default') {
	const dispatch = useAppDispatch()
	const loadStatus = useAppSelector(selectCandidatesLoadStatus)
	const hasFetched = useRef(false)

	useEffect(() => {
		if (hasFetched.current) return
		if (loadStatus !== 'idle') return
		hasFetched.current = true
		dispatch(fetchCandidatesThunk(source))
	}, [dispatch, loadStatus, source])

	return loadStatus
}
