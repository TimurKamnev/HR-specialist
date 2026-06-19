export function StackCard({ stack }: { stack: string }) {
	const items = stack
		.split(',')
		.map(s => s.trim())
		.filter(Boolean)

	return (
		<div className='bg-white border border-border rounded-lg p-5'>
			<h2 className='text-lg font-bold mb-4'>Стек технологий</h2>
			<div className='flex flex-wrap gap-2'>
				{items.map(item => (
					<span
						key={item}
						className='border border-border rounded-lg px-2.5 py-1 text-sm'
					>
						{item}
					</span>
				))}
			</div>
		</div>
	)
}
