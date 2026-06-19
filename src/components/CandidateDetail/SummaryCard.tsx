export function SummaryCard({ summary }: { summary: string }) {
	return (
		<div className='bg-white border border-border rounded-lg p-5'>
			<h2 className='text-lg font-bold mb-4'>Summary</h2>
			<p className='text-sm leading-relaxed'>{summary}</p>
		</div>
	)
}
