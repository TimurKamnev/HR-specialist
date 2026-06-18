interface PaginationProps {
	page: number
	totalPages: number
	totalCount: number
	pageSize: number
	onPageChange: (page: number) => void
}

export function Pagination({
	page,
	totalPages,
	totalCount,
	pageSize,
	onPageChange,
}: PaginationProps) {
	const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1
	const to = Math.min(page * pageSize, totalCount)
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

	return (
		<nav
			className='flex items-center justify-between flex-wrap gap-3'
			aria-label='Пагинация'
		>
			<p className='text-sm text-text-muted'>
				Показано {from}-{to} из {totalCount}
			</p>
			<div className='flex items-center gap-1'>
				<button
					onClick={() => onPageChange(page - 1)}
					disabled={page <= 1}
					className='px-2 py-1 rounded-lg border border-border disabled:opacity-40 disabled:cursor-not-allowed'
					aria-label='Предыдущая страница'
				>
					‹
				</button>
				{pages.map(p => (
					<button
						key={p}
						onClick={() => onPageChange(p)}
						aria-current={p === page ? 'page' : undefined}
						className={`w-8 h-8 rounded-lg text-sm ${
							p === page
								? 'bg-primary-500 text-white'
								: 'border border-border hover:bg-background'
						}`}
					>
						{p}
					</button>
				))}
				<button
					onClick={() => onPageChange(page + 1)}
					disabled={page >= totalPages}
					className='px-2 py-1 rounded-lg border border-border disabled:opacity-40 disabled:cursor-not-allowed'
					aria-label='Следующая страница'
				>
					›
				</button>
			</div>
		</nav>
	)
}
