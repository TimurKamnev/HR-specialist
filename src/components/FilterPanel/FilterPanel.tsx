import { useAppDispatch, useAppSelector } from '../../store'
import {
	resetFilters,
	selectFilters,
	setSearch,
	setSort,
	setStatus,
	setVerdict,
} from '../../store/filtersSlice'
import {
	STATUS_LABELS,
	VERDICT_LABELS,
	type SortDirection,
	type SortField,
	type StatusFilter,
	type VerdictFilter,
} from '../../types/candidate'
import { Button } from '../ui/Button/Button'
import { SearchBar } from '../SearchBar/SearchBar'
import { useCallback, useState } from 'react'
import Popover from '../ui/Popover/Popover'

const SORT_OPTIONS: Array<{
	value: string
	label: string
	field: SortField
	direction: SortDirection
}> = [
	{
		value: 'createdAt-desc',
		label: 'По дате (новые)',
		field: 'createdAt',
		direction: 'desc',
	},
	{
		value: 'createdAt-asc',
		label: 'По дате (старые)',
		field: 'createdAt',
		direction: 'asc',
	},
	{
		value: 'name-asc',
		label: 'По имени (А-Я)',
		field: 'name',
		direction: 'asc',
	},
	{
		value: 'name-desc',
		label: 'По имени (Я-А)',
		field: 'name',
		direction: 'desc',
	},
	{
		value: 'experience-desc',
		label: 'По опыту (больше)',
		field: 'experience',
		direction: 'desc',
	},
	{
		value: 'experience-asc',
		label: 'По опыту (меньше)',
		field: 'experience',
		direction: 'asc',
	},
]

export function FilterPanel() {
	const dispatch = useAppDispatch()
	const filters = useAppSelector(selectFilters)
	const [searchKey, setSearchKey] = useState(0)
	const currentSortValue = `${filters.sortField}-${filters.sortDirection}`

	const handleSearch = useCallback(
		(value: string) => dispatch(setSearch(value)),
		[dispatch],
	)

	function handleReset() {
		dispatch(resetFilters())
		setSearchKey(k => k + 1) // remount SearchBar → инпут очищается
	}

	return (
		<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
			<div className='flex items-center gap-3 flex-1'>
				<div className='sm:w-80'>
					<SearchBar key={searchKey} onSearch={handleSearch} />
				</div>

				<Popover
					trigger={({ ref, onClick }) => (
						<button ref={ref} onClick={onClick} className='cursor-pointer'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='size-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z'
								/>
							</svg>
						</button>
					)}
				>
					<select
						value={filters.status}
						onChange={e => dispatch(setStatus(e.target.value as StatusFilter))}
						className='border border-border rounded-lg py-2 px-3'
						aria-label='Фильтр по статусу'
					>
						<option value='all'>Все статусы</option>
						{Object.entries(STATUS_LABELS).map(([value, label]) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
					</select>

					<select
						value={filters.verdict}
						onChange={e =>
							dispatch(setVerdict(e.target.value as VerdictFilter))
						}
						className='border border-border rounded-lg py-2 px-3'
						aria-label='Фильтр по вердикту'
					>
						<option value='all'>Все вердикты</option>
						{Object.entries(VERDICT_LABELS).map(([value, label]) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
					</select>

					<Button
						variant='secondary'
						className='border border-border bg-white'
						onClick={handleReset}
					>
						Сбросить
					</Button>
				</Popover>
			</div>

			<select
				value={currentSortValue}
				onChange={e => {
					const option = SORT_OPTIONS.find(o => o.value === e.target.value)
					if (option)
						dispatch(
							setSort({ field: option.field, direction: option.direction }),
						)
				}}
				className='border border-border rounded-lg py-2 px-3'
				aria-label='Сортировка'
			>
				{SORT_OPTIONS.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	)
}
