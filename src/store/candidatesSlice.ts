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
}

const initialState: CandidatesState = {
	items: [],
	loadStatus: 'idle',
	error: null,
	updatingIds: [],
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
	id: string
	previousStatus: CandidateStatus
	message: string
}

export const updateCandidateStatusThunk = createAsyncThunk<
	UpdateStatusResponse,
	UpdateStatusArg,
	{ state: RootState; rejectValue: UpdateStatusRejection }
>(
	'candidates/updateStatus',
	async ({ id, status }, { getState, signal, rejectWithValue }) => {
		const previousStatus = getState().candidates.items.find(
			(c: { id: string }) => c.id === id,
		)?.status

		if (!previousStatus) {
			return rejectWithValue({
				id,
				previousStatus: 'new',
				message: 'Кандидат не найден',
			})
		}

		try {
			return await updateCandidateStatus(id, status, signal)
		} catch (err) {
			const message =
				err && typeof err === 'object' && 'message' in err
					? String((err as { message: unknown }).message)
					: 'Не удалось обновить статус'
			return rejectWithValue({ id, previousStatus, message })
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
			// Optimistic update: меняем статус ДО ответа сервера
			.addCase(updateCandidateStatusThunk.pending, (state, action) => {
				const { id, status } = action.meta.arg
				const candidate = state.items.find(c => c.id === id)
				if (candidate) candidate.status = status
				state.updatingIds.push(id)
			})
			.addCase(updateCandidateStatusThunk.fulfilled, (state, action) => {
				state.updatingIds = state.updatingIds.filter(
					id => id !== action.payload.id,
				)
				// статус уже выставлен оптимистично в pending и совпадает с ответом
			})
			.addCase(updateCandidateStatusThunk.rejected, (state, action) => {
				const payload = action.payload
				if (!payload) return
				const candidate = state.items.find(c => c.id === payload.id)
				if (candidate) candidate.status = payload.previousStatus // rollback
				state.updatingIds = state.updatingIds.filter(id => id !== payload.id)
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
