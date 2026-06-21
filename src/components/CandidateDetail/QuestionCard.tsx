export function QuestionCard({ questions }: { questions: string[] }) {
	return (
		<div className='bg-white border border-border rounded-lg p-4'>
			<h2 className='text-lg font-bold mb-4'>Вопросы для собеседования</h2>
			<ul className='flex flex-col gap-2 list-disc list-inside text-sm'>
				{questions.map((q, i) => (
					<li key={i}>{q}</li>
				))}
			</ul>
		</div>
	)
}
