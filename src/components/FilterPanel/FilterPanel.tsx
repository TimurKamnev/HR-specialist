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
import { useState } from 'react'

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

	function handleReset() {
		dispatch(resetFilters())
		setSearchKey(k => k + 1) // remount SearchBar → инпут очищается
	}

	return (
		<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
			<div className='flex flex-col sm:flex-row gap-3 flex-1'>
				<div className='sm:w-64'>
					<SearchBar key={searchKey} onSearch={v => dispatch(setSearch(v))} />
				</div>

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
					onChange={e => dispatch(setVerdict(e.target.value as VerdictFilter))}
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
