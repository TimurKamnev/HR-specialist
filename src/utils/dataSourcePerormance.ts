import type { DataSource } from '../services/mockData'

const STORAGE_KEY = 'hr-specialist:dataSource'

export function getStoredDataSource(): DataSource {
	const stored = window.localStorage.getItem(STORAGE_KEY)
	return stored === 'large' ? 'large' : 'default'
}

export function setStoredDataSource(source: DataSource): void {
	window.localStorage.setItem(STORAGE_KEY, source)
}
