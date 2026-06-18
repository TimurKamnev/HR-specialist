import { useEffect, useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'

interface SearchBarProps {
	onSearch: (value: string) => void
	debounceMs?: number
}

export function SearchBar({ onSearch, debounceMs = 300 }: SearchBarProps) {
	const [inputValue, setInputValue] = useState('')
	const debouncedValue = useDebounce(inputValue, debounceMs)

	useEffect(() => {
		onSearch(debouncedValue)
	}, [debouncedValue, onSearch])

	return (
		<div className='relative'>
			<input
				type='text'
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				placeholder='Поиск по ФИО...'
				aria-label='Поиск по ФИО'
				className='border border-border py-2 px-3 pl-9 rounded-lg w-full'
			/>
			<svg
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth={2}
				className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted'
				aria-hidden='true'
			>
				<circle cx='11' cy='11' r='7' />
				<line x1='21' y1='21' x2='16.65' y2='16.65' />
			</svg>
		</div>
	)
}
