import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { candidatesReducer } from './candidatesSlice'
import { filtersReducer } from './filtersSlice'

export function createAppStore() {
	return configureStore({
		reducer: {
			candidates: candidatesReducer,
			filters: filtersReducer,
		},
	})
}
export const store = createAppStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
