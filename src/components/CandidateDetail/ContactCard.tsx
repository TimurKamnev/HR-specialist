import type { Candidate } from '../../types/candidate'

export function ContactCard({ candidate }: { candidate: Candidate }) {
	return (
		<div className='bg-white'>
			<h2 className='text-lg font-bold mb-4'>Контакты</h2>
			<ul className='flex flex-col gap-3 text-sm'>
				<li className='flex items-center gap-2'>
					<span aria-hidden='true'>✉️</span>
					<a href={`mailto:${candidate.email}`} className='hover:underline'>
						{candidate.email}
					</a>
				</li>
				{candidate.phone && (
					<li className='flex items-center gap-2'>
						<span aria-hidden='true'>📞</span>
						<a href={`tel:${candidate.phone}`} className='hover:underline'>
							{candidate.phone}
						</a>
					</li>
				)}
				<li className='flex items-center gap-2'>
					<span aria-hidden='true'>📍</span>
					{candidate.city}
				</li>
				<li className='flex items-center gap-2'>
					<span aria-hidden='true'>✈️</span>
					{candidate.tg}
				</li>
			</ul>
			{/* Ссылка фейковая — реальных файлов резюме в моках нет, только имя */}
			{candidate.file && (
				<div className='mt-4 flex items-center justify-between gap-2 border border-border rounded-lg px-3 py-2 text-sm text-text-muted'>
					{candidate.file}
					<span aria-hidden='true'>⬇</span>
				</div>
			)}
		</div>
	)
}
