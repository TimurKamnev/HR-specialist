import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Pagination } from './Pagination'

describe('Pagination', () => {
	it('показывает корректный диапазон "Показано X-Y из Z"', () => {
		render(
			<Pagination
				page={2}
				totalPages={3}
				totalCount={25}
				pageSize={10}
				onPageChange={vi.fn()}
			/>,
		)
		expect(screen.getByText('Показано 11-20 из 25')).toBeInTheDocument()
	})

	it('последняя страница показывает остаток, а не полный pageSize', () => {
		render(
			<Pagination
				page={3}
				totalPages={3}
				totalCount={25}
				pageSize={10}
				onPageChange={vi.fn()}
			/>,
		)
		expect(screen.getByText('Показано 21-25 из 25')).toBeInTheDocument()
	})

	it('кнопка "назад" отключена на первой странице', () => {
		render(
			<Pagination
				page={1}
				totalPages={3}
				totalCount={25}
				pageSize={10}
				onPageChange={vi.fn()}
			/>,
		)
		expect(screen.getByLabelText('Предыдущая страница')).toBeDisabled()
	})

	it('кнопка "вперёд" отключена на последней странице', () => {
		render(
			<Pagination
				page={3}
				totalPages={3}
				totalCount={25}
				pageSize={10}
				onPageChange={vi.fn()}
			/>,
		)
		expect(screen.getByLabelText('Следующая страница')).toBeDisabled()
	})

	it('вызывает onPageChange с номером страницы при клике', async () => {
		const user = userEvent.setup()
		const onPageChange = vi.fn()
		render(
			<Pagination
				page={1}
				totalPages={3}
				totalCount={25}
				pageSize={10}
				onPageChange={onPageChange}
			/>,
		)

		await user.click(screen.getByText('2'))
		expect(onPageChange).toHaveBeenCalledWith(2)
	})

	it('вызывает onPageChange с page+1 при клике на "вперёд"', async () => {
		const user = userEvent.setup()
		const onPageChange = vi.fn()
		render(
			<Pagination
				page={1}
				totalPages={3}
				totalCount={25}
				pageSize={10}
				onPageChange={onPageChange}
			/>,
		)

		await user.click(screen.getByLabelText('Следующая страница'))
		expect(onPageChange).toHaveBeenCalledWith(2)
	})

	it('текущая страница помечена aria-current', () => {
		render(
			<Pagination
				page={2}
				totalPages={3}
				totalCount={25}
				pageSize={10}
				onPageChange={vi.fn()}
			/>,
		)
		expect(screen.getByText('2')).toHaveAttribute('aria-current', 'page')
	})
})
