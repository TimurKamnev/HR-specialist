import { Button } from '../ui/Button/Button'

export default function Dashboard() {
	return (
		<section className='flex-1 bg-white p-5 border border-border rounded-lg'>
			<h1 className='mb-3 pb-3 border-b border-b-border text-3xl font-bold'>
				Кандидаты
			</h1>
			<div className='flex justify-between'>
				<div className='flex gap-4'>
					<input
						className='border border-border py-2 px-3 rounded-lg'
						type='text'
						placeholder='Поиск по ФИО...'
					/>
					<select
						className='border border-border rounded-lg py-2 px-3'
						defaultValue={0}
					>
						<option>Все статусы</option>
						<option>Новый</option>
						<option>На рассмотрении</option>
						<option>Отклонен</option>
						<option>Приглашен</option>
					</select>
					<select
						className='border border-border rounded-lg py-2 px-3'
						defaultValue={0}
					>
						<option>Все Вердикты</option>
						<option>Частично</option>
						<option>Подходит</option>
						<option>Не подходит</option>
					</select>
					<Button className='border border-border'>Сбросить</Button>
				</div>

				<div>
					<select
						className='border border-border rounded-lg py-2 px-3'
						aria-placeholder='Сортировка:'
						defaultValue={0}
					>
						<option>По дате (новые)</option>
						<option>По дате (старые)</option>
					</select>
				</div>
			</div>
		</section>
	)
}
