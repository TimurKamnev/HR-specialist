import type { Candidate } from '../../types/candidate'

export function ContactCard({ candidate }: { candidate: Candidate }) {
	return (
		<div className='bg-white'>
			<h2 className='text-lg font-bold mb-4'>Контакты</h2>
			<ul className='flex flex-col gap-3 text-sm'>
				<li className='flex items-center gap-2'>
					<span aria-hidden='true'>
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
								d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
							/>
						</svg>
					</span>
					<a href={`mailto:${candidate.email}`} className='hover:underline'>
						{candidate.email}
					</a>
				</li>
				{candidate.phone && (
					<li className='flex items-center gap-2'>
						<span aria-hidden='true'>
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
									d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z'
								/>
							</svg>
						</span>
						<a href={`tel:${candidate.phone}`} className='hover:underline'>
							{candidate.phone}
						</a>
					</li>
				)}
				<li className='flex items-center gap-2'>
					<span aria-hidden='true'>
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
								d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
							/>
						</svg>
					</span>
					{candidate.city ?? 'Не указан'}
				</li>
				<li className='flex items-center gap-2'>
					<span aria-hidden='true'>
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
								d='M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25'
							/>
						</svg>
					</span>
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
