import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {
	CandidateFilters,
	SortDirection,
	SortField,
	StatusFilter,
	VerdictFilter,
} from '../types/candidate'
import type { RootState } from './index'

export const DEFAULT_PAGE_SIZE = 10

const initialState: CandidateFilters = {
	search: '',
	verdict: 'all',
	status: 'all',
	sortField: 'createdAt',
	sortDirection: 'desc',
	page: 1,
}

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload
			state.page = 1
		},
		setVerdict: (state, action: PayloadAction<VerdictFilter>) => {
			state.verdict = action.payload
			state.page = 1
		},
		setStatus: (state, action: PayloadAction<StatusFilter>) => {
			state.status = action.payload
			state.page = 1
		},
		setSort: (
			state,
			action: PayloadAction<{ field: SortField; direction: SortDirection }>,
		) => {
			state.sortField = action.payload.field
			state.sortDirection = action.payload.direction
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload
		},
		resetFilters: () => initialState,
		/** Полная замена стейта при инициализации из query params URL */
		hydrateFromUrl: (_state, action: PayloadAction<CandidateFilters>) =>
			action.payload,
	},
})

export const {
	setSearch,
	setVerdict,
	setStatus,
	setSort,
	setPage,
	resetFilters,
	hydrateFromUrl,
} = filtersSlice.actions

export const filtersReducer = filtersSlice.reducer
export const selectFilters = (state: RootState) => state.filters
