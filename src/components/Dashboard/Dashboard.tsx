import { useAppDispatch, useAppSelector } from '../../store'
import { selectAllCandidates } from '../../store/candidatesSlice'
import { DEFAULT_PAGE_SIZE, setPage } from '../../store/filtersSlice'
import { useCandidates } from '../../hooks/useCandidates'
import { FilterPanel } from '../FilterPanel/FilterPanel'
import { CandidateList } from '../CandidateList/CandidateList'
import { Pagination } from '../ui/Pagination/Pagination'

export default function Dashboard() {
	const dispatch = useAppDispatch()
	const allCandidates = useAppSelector(selectAllCandidates)
	const { candidates, totalCount, totalPages, loadStatus, error, filters } =
		useCandidates()

	return (
		<section className='flex-1 bg-white p-5 border border-border flex flex-col overflow-hidden rounded-lg'>
			<h1 className='mb-3 pb-3 border-b border-b-border text-3xl font-bold flex items-center gap-2'>
				Кандидаты
				<span className='text-base font-normal text-text-muted'>
					{allCandidates.length}
				</span>
			</h1>

			<div className='mb-4 shrink-0'>
				<FilterPanel />
			</div>

			<div className='flex-1 overflow-y-auto'>
				<CandidateList
					candidates={candidates}
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
