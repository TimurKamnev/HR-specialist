import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import {
	fetchCandidatesThunk,
	selectAllCandidates,
} from '../../store/candidatesSlice'
import { DEFAULT_PAGE_SIZE, setPage } from '../../store/filtersSlice'
import { useCandidates } from '../../hooks/useCandidates'
import { FilterPanel } from '../FilterPanel/FilterPanel'
import { CandidateList } from '../CandidateList/CandidateList'
import { Pagination } from '../ui/Pagination/Pagination'
import type { DataSource } from '../../services/mockData'
import {
	getStoredDataSource,
	setStoredDataSource,
} from '../../utils/dataSourcePerormance'

export default function Dashboard() {
	const dispatch = useAppDispatch()
	const allCandidates = useAppSelector(selectAllCandidates)
	const { candidates, totalCount, totalPages, loadStatus, error, filters } =
		useCandidates()
	const [dataSource, setDataSource] = useState<DataSource>(getStoredDataSource)

	function handleSourceToggle() {
		const next: DataSource = dataSource === 'default' ? 'large' : 'default'
		setDataSource(next)
		setStoredDataSource(next)
		dispatch(fetchCandidatesThunk(next))
		dispatch(setPage(1))
	}

	return (
		<section className='flex-1 bg-white p-5 border border-border rounded-lg flex flex-col overflow-hidden'>
			<div className='flex items-center justify-between mb-3 pb-3 border-b border-b-border shrink-0 flex-wrap gap-3'>
				<h1 className='text-lg md:text-3xl font-bold flex items-center gap-2'>
					Кандидаты
					<span className='text-base font-normal text-text-muted'>
						{allCandidates.length}
					</span>
				</h1>
				<button
					onClick={handleSourceToggle}
					className='text-sm border border-border rounded-lg px-3 py-1.5 hover:bg-background'
				>
					{dataSource === 'default'
						? 'Включить большой список (120)'
						: 'Вернуть обычный список (25)'}
				</button>
			</div>

			<div className='mb-4 shrink-0'>
				<FilterPanel />
			</div>

			<div className='flex-1 min-h-100 lg:min-h-0'>
				<CandidateList
					candidates={candidates}
					page={filters.page}
					pageSize={DEFAULT_PAGE_SIZE}
					isLoading={loadStatus === 'loading' || loadStatus === 'idle'}
					error={error}
				/>
			</div>

			{loadStatus === 'succeeded' && totalCount > 0 && (
				<div className='mt-4 pt-4 border-t border-border shrink-0'>
					<Pagination
						page={filters.page}
						totalPages={totalPages}
						totalCount={totalCount}
						pageSize={DEFAULT_PAGE_SIZE}
						onPageChange={page => dispatch(setPage(page))}
					/>
				</div>
			)}
		</section>
	)
}
