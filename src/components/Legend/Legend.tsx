export default function Legend() {
	return (
		<aside className='max-w-full lg:max-w-1/3'>
			<div className='bg-white flex-1 lg:flex-0 border border-border rounded-lg p-3 md:p-5'>
				<h2 className='text-base md:text-lg font-bold mb-5'>Статусы</h2>
				<ul className='flex flex-col gap-3'>
					<li className='grid grid-cols-2 gap-2'>
						<strong className='text-xs md:text-sm bg-primary-300/20 border border-primary-300/20 text-primary-500 rounded-lg max-w-max h-max py-1 px-2'>
							Новый
						</strong>
						<span className='self-center text-xs md:text-sm'>
							Кандидат добавлен
						</span>
					</li>
					<li className='grid grid-cols-2 gap-2'>
						<strong className='text-sm bg-warning-500/20 border border-warning-500/20 text-amber-600 rounded-lg max-w-max h-max py-1 px-2'>
							На рассмотрении
						</strong>
						<span className='self-center text-xs md:text-sm'>
							HR просматривает
						</span>
					</li>
					<li className='grid grid-cols-2 gap-2'>
						<strong className='text-xs md:text-sm bg-purple-500/20 border border-purple-500/20 text-purple-700 rounded-lg max-w-max h-max py-1 px-2'>
							Приглашён
						</strong>
						<span className='self-center text-xs md:text-sm'>
							Кандидат приглашён
						</span>
					</li>
					<li className='grid grid-cols-2 gap-2'>
						<strong className='text-xs md:text-sm bg-text-muted/20 border border-text-muted/20 text-gray-600 rounded-lg max-w-max h-max py-1 px-2'>
							Отклонён
						</strong>
						<span className='self-center text-xs md:text-sm'>
							Кандидат не подходит
						</span>
					</li>
				</ul>
			</div>
			<div className='bg-white flex-1 lg:flex-0 border border-border rounded-lg p-3 md:p-5 mt-4'>
				<h2 className='text-base md:text-lg font-bold mb-5'>
					Вердикт (цветовая индикация)
				</h2>
				<ul className='flex flex-col gap-3'>
					<li className='grid grid-cols-2 gap-2'>
						<strong className='border text-xs md:text-sm border-green-400/20 bg-green-300/20 text-green-600 rounded-lg max-w-max h-max py-1 px-2 uppercase'>
							Подходит
						</strong>
						<span className='self-center text-xs md:text-sm'>
							Кандидат полностью соответствует требованиям
						</span>
					</li>
					<li className='grid grid-cols-2 gap-2'>
						<strong className='border text-xs md:text-sm border-orange-300/20 bg-orange-300/20 text-amber-600 rounded-lg max-w-max h-max py-1 px-2 uppercase'>
							Частично
						</strong>
						<span className='self-center text-xs md:text-sm'>
							Кандидат частично соответствует требованиям
						</span>
					</li>
					<li className='grid grid-cols-2 gap-2'>
						<strong className='border text-xs md:text-sm border-red-400/20 bg-red-300/20 text-red-600 rounded-lg max-w-max h-max py-1 px-2 uppercase'>
							Не подходит
						</strong>
						<span className='self-center text-xs md:text-sm'>
							Кандидат не соответствует требованиям
						</span>
					</li>
				</ul>
			</div>
		</aside>
	)
}
