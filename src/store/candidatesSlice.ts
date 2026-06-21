import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type {
	Candidate,
	CandidateStatus,
	UpdateStatusResponse,
} from '../types/candidate'
import { fetchCandidates, updateCandidateStatus } from '../services/api'
import type { DataSource } from '../services/mockData'
import type { RootState } from './index'

export type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

interface CandidatesState {
	items: Candidate[]
	loadStatus: LoadStatus
	error: string | null
	updatingIds: string[]
	rollbackStatuses: Record<string, CandidateStatus>
}

const initialState: CandidatesState = {
	items: [],
	loadStatus: 'idle',
	error: null,
	updatingIds: [],
	rollbackStatuses: {},
}

export const fetchCandidatesThunk = createAsyncThunk<
	Candidate[],
	DataSource | void
>('candidates/fetchAll', async source => {
	return fetchCandidates(source ?? undefined)
})

interface UpdateStatusArg {
	id: string
	status: CandidateStatus
}

interface UpdateStatusRejection {
	message: string
}

export const updateCandidateStatusThunk = createAsyncThunk<
	UpdateStatusResponse,
	UpdateStatusArg,
	{ state: RootState; rejectValue: UpdateStatusRejection }
>(
	'candidates/updateStatus',
	async ({ id, status }, { signal, rejectWithValue }) => {
		try {
			return await updateCandidateStatus(id, status, signal)
		} catch (err) {
			const message =
				err && typeof err === 'object' && 'message' in err
					? String((err as { message: unknown }).message)
					: 'Не удалось обновить статус'
			return rejectWithValue({ message })
		}
	},
)

const candidatesSlice = createSlice({
	name: 'candidates',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCandidatesThunk.pending, state => {
				state.loadStatus = 'loading'
				state.error = null
			})
			.addCase(fetchCandidatesThunk.fulfilled, (state, action) => {
				state.loadStatus = 'succeeded'
				state.items = action.payload
			})
			.addCase(fetchCandidatesThunk.rejected, (state, action) => {
				state.loadStatus = 'failed'
				state.error =
					action.error.message ?? 'Не удалось загрузить список кандидатов'
			})
			// Optimistic update: сохраняем ИСХОДНЫЙ статус ДО мутации, затем меняем
			.addCase(updateCandidateStatusThunk.pending, (state, action) => {
				const { id, status } = action.meta.arg
				const candidate = state.items.find(c => c.id === id)
				if (!candidate) return
				state.rollbackStatuses[id] = candidate.status
				candidate.status = status
				state.updatingIds.push(id)
			})
			.addCase(updateCandidateStatusThunk.fulfilled, (state, action) => {
				const { id } = action.payload
				delete state.rollbackStatuses[id]
				state.updatingIds = state.updatingIds.filter(uid => uid !== id)
			})
			.addCase(updateCandidateStatusThunk.rejected, (state, action) => {
				const { id } = action.meta.arg
				const candidate = state.items.find(c => c.id === id)
				const previousStatus = state.rollbackStatuses[id]
				if (candidate && previousStatus) candidate.status = previousStatus
				delete state.rollbackStatuses[id]
				state.updatingIds = state.updatingIds.filter(uid => uid !== id)
			})
	},
})

export const candidatesReducer = candidatesSlice.reducer

export const selectAllCandidates = (state: RootState) => state.candidates.items
export const selectCandidatesLoadStatus = (state: RootState) =>
	state.candidates.loadStatus
export const selectCandidatesError = (state: RootState) =>
	state.candidates.error
export const selectIsUpdatingStatus = (id: string) => (state: RootState) =>
	state.candidates.updatingIds.includes(id)
export const selectCandidateById = (id: string) => (state: RootState) =>
	state.candidates.items.find(c => c.id === id)
