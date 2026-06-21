import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createAppStore } from '../../store'
import { makeCandidate } from '../factories'
import App from '../../App'
import CandidatesPage from '../../pages/CandidatesPage'
import CandidateDetailPage from '../../pages/CandidateDetailPage'
import NotFound from '../../pages/NotFound'
import * as api from '../../services/api'

vi.mock('../../services/api')

const fixtures = [
	makeCandidate({
		id: 'ivanov',
		name: 'Иванов Иван Иванович',
		verdict: 'ПОДХОДИТ',
		email: 'ivanov@email.com',
	}),
	makeCandidate({
		id: 'petrova',
		name: 'Петрова Анна Сергеевна',
		verdict: 'ЧАСТИЧНО',
		email: 'petrova@email.com',
	}),
]

function renderApp(initialEntries: string[]) {
	const store = createAppStore()
	const router = createMemoryRouter(
		[
			{
				element: <App />,
				children: [
					{ index: true, element: <CandidatesPage /> },
					{ path: '/candidate/:id', element: <CandidateDetailPage /> },
					{ path: '*', element: <NotFound /> },
				],
			},
		],
		{ initialEntries },
	)

	return render(
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>,
	)
}

describe('переход список → детальная страница', () => {
	beforeEach(() => {
		vi.mocked(api.fetchCandidates).mockResolvedValue(fixtures)
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('открывает детальную страницу при клике на кандидата', async () => {
		const user = userEvent.setup()
		renderApp(['/'])

		const candidateLink = await screen.findByTestId('candidate-card-ivanov')
		await user.click(candidateLink)

		// Контакты есть только на детальной странице — хороший признак, что переход состоялся
		expect(await screen.findByText('ivanov@email.com')).toBeInTheDocument()
		expect(
			screen.getByRole('heading', { name: 'Иванов Иван Иванович' }),
		).toBeInTheDocument()
	})

	it('показывает 404 при заходе на несуществующего кандидата', async () => {
		renderApp(['/candidate/no-such-id'])

		expect(await screen.findByText('Кандидат не найден')).toBeInTheDocument()
	})

	it('кнопка "Назад к списку" возвращает на страницу с сохранёнными фильтрами', async () => {
		const user = userEvent.setup()
		renderApp([`/?search=${encodeURIComponent('Петрова')}`])

		const candidateLink = await screen.findByTestId('candidate-card-petrova')
		await user.click(candidateLink)

		const backLink = await screen.findByText('← Назад к списку')
		await user.click(backLink)

		// Если фильтр сохранился — в списке снова виден только подходящий кандидат
		await screen.findByTestId('candidate-card-petrova')
		expect(
			screen.queryByTestId('candidate-card-ivanov'),
		).not.toBeInTheDocument()
	})
})
