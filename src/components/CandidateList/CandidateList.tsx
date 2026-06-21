import { memo, useEffect, useRef } from 'react'
import type { Candidate } from '../../types/candidate'
import { CandidateCard } from '../CandidateCard/CandidateCard'
import { FixedSizeList, type ListChildComponentProps } from 'react-window'
import { useElementHeight } from '../../hooks/useElementHeight'

const ROW_HEIGHT = 88

interface CandidateListProps {
	candidates: Candidate[]
	page: number
	pageSize: number
	isLoading: boolean
	error: string | null
}

const Row = memo(function Row({
	index,
	style,
	data,
}: ListChildComponentProps<Candidate[]>) {
	return (
		<div style={style} className='border-b border-border'>
			<CandidateCard candidate={data[index]} />
		</div>
	)
})

export function CandidateList({
	candidates,
	page,
	pageSize,
	isLoading,
	error,
}: CandidateListProps) {
	const listRef = useRef<FixedSizeList>(null)
	const { ref: containerRef, height } = useElementHeight<HTMLDivElement>()

	useEffect(() => {
		listRef.current?.scrollToItem((page - 1) * pageSize, 'start')
	}, [page, pageSize])

	if (isLoading) {
		return (
			<div className='py-12 text-center text-text-muted' role='status'>
				Загрузка кандидатов...
			</div>
		)
	}

	if (error) {
		return (
			<div className='py-12 text-center text-red-600' role='alert'>
				{error}
			</div>
		)
	}

	if (candidates.length === 0) {
		return (
			<div className='py-12 text-center text-text-muted'>
				По заданным фильтрам кандидаты не найдены
			</div>
		)
	}

	return (
		<div className='flex flex-col h-full' aria-label='Список кандидатов'>
			<div className='hidden lg:grid grid-cols-[2fr_0.8fr_0.6fr_1.5fr_0.9fr_0.9fr_0.9fr_auto] gap-3 px-3 py-2 text-sm text-text-muted border-b border-border shrink-0'>
				<span>Кандидат</span>
				<span>Город</span>
				<span>Опыт</span>
				<span>Стек</span>
				<span>Вердикт</span>
				<span>Статус</span>
				<span>Добавлен</span>
				<span aria-hidden='true' />
			</div>

			<div ref={containerRef} className='flex-1 min-h-100 lg:min-h-0'>
				{height > 0 && (
					<FixedSizeList
						ref={listRef}
						height={height}
						width='100%'
						itemCount={candidates.length}
						itemSize={ROW_HEIGHT}
						itemData={candidates}
					>
						{Row}
					</FixedSizeList>
				)}
			</div>
		</div>
	)
}
