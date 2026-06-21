import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { candidatesReducer } from './candidatesSlice'
import { filtersReducer } from './filtersSlice'

const rootReducer = combineReducers({
	candidates: candidatesReducer,
	filters: filtersReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function createAppStore(preloadedState?: Partial<RootState>) {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	})
}

export const store = createAppStore()

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
