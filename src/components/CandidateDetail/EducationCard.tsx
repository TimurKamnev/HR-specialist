export function EducationCard({ edu }: { edu: string }) {
	return (
		<div className='bg-white border border-border rounded-lg p-4'>
			<h2 className='text-lg font-bold mb-4'>Образование</h2>
			<p className='text-sm'>{edu}</p>
		</div>
	)
}
