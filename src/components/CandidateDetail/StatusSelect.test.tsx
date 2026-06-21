import { render, screen } from '@testing-library/react'
import { waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createAppStore } from '../../store'
import { ToastProvider } from '../ui/Toast/Toast'
import { makeCandidate } from '../../test/factories'
import { StatusSelect } from './StatusSelect'
import * as api from '../../services/api'

vi.mock('../../services/api')

function renderStatusSelect(
	candidateId: string,
	currentStatus: 'new' | 'review' | 'invited' | 'rejected',
) {
	const candidate = makeCandidate({ id: candidateId, status: currentStatus })
	const store = createAppStore({
		candidates: {
			items: [candidate],
			loadStatus: 'succeeded',
			error: null,
			updatingIds: [],
			rollbackStatuses: {},
		},
		filters: {
			search: '',
			verdict: 'all',
			status: 'all',
			sortField: 'createdAt',
			sortDirection: 'desc',
			page: 1,
		},
	})

	render(
		<Provider store={store}>
			<ToastProvider>
				<StatusSelect candidateId={candidateId} currentStatus={currentStatus} />
			</ToastProvider>
		</Provider>,
	)

	return store
}

describe('StatusSelect', () => {
	afterEach(() => {
		vi.clearAllMocks()
	})

	it('применяет новый статус и показывает success-тост при удачном запросе', async () => {
		vi.mocked(api.updateCandidateStatus).mockResolvedValue({
			id: 'ivanov',
			status: 'review',
			updatedAt: '2026-01-01T00:00:00Z',
		})

		const user = userEvent.setup()
		const store = renderStatusSelect('ivanov', 'new')

		await user.selectOptions(
			screen.getByLabelText('Статус кандидата'),
			'review',
		)

		await waitFor(() => {
			expect(store.getState().candidates.items[0].status).toBe('review')
		})
		expect(await screen.findByText(/Статус изменён/)).toBeInTheDocument()
	})

	it('откатывает статус и показывает error-тост при неудачном запросе', async () => {
		let rejectPromise: (reason: { message: string }) => void = () => {}
		vi.mocked(api.updateCandidateStatus).mockImplementation(
			() =>
				new Promise((_resolve, reject) => {
					rejectPromise = reject
				}),
		)

		const user = userEvent.setup()
		const store = renderStatusSelect('ivanov', 'new')

		await user.selectOptions(
			screen.getByLabelText('Статус кандидата'),
			'review',
		)

		expect(store.getState().candidates.items[0].status).toBe('review')

		// Теперь реджектим явно — и проверяем rollback
		rejectPromise({ message: 'Сеть недоступна' })

		await waitFor(() => {
			expect(store.getState().candidates.items[0].status).toBe('new')
		})
		expect(await screen.findByText('Сеть недоступна')).toBeInTheDocument()
	})

	it('блокирует select во время запроса', async () => {
		let resolvePromise: (value: {
			id: string
			status: 'review'
			updatedAt: string
		}) => void = () => {}
		vi.mocked(api.updateCandidateStatus).mockImplementation(
			() =>
				new Promise(resolve => {
					resolvePromise = resolve
				}),
		)

		const user = userEvent.setup()
		renderStatusSelect('ivanov', 'new')

		const select = screen.getByLabelText('Статус кандидата')
		await user.selectOptions(select, 'review')

		expect(select).toBeDisabled()

		resolvePromise({
			id: 'ivanov',
			status: 'review',
			updatedAt: '2026-01-01T00:00:00Z',
		})
		await waitFor(() => expect(select).not.toBeDisabled())
	})
})
