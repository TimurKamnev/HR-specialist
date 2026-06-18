import type {
	ApiError,
	Candidate,
	CandidateStatus,
	UpdateStatusResponse,
} from '../types/candidate'
import { getMockData, type DataSource } from './mockData'

const NETWORK_DELAY = 600
const STATUS_UPDATE_FAILURE_RATE = 0.15

function delay(ms: number, signal?: AbortSignal): Promise<void> {
	return new Promise((resolve, reject) => {
		const timeOutId = setTimeout(resolve, ms)
		signal?.addEventListener('abort', () => {
			clearTimeout(timeOutId)
			reject(new DOMException('Aborted', 'AbortError'))
		})
	})
}

export async function fetchCandidates(
	source: DataSource = 'default',
	signal?: AbortSignal,
): Promise<Candidate[]> {
	await delay(NETWORK_DELAY, signal)
	return getMockData(source)
}

export async function updateCandidateStatus(
	id: string,
	status: CandidateStatus,
	signal: AbortSignal,
): Promise<UpdateStatusResponse> {
	await delay(NETWORK_DELAY, signal)

	if (Math.random() < STATUS_UPDATE_FAILURE_RATE) {
		const error: ApiError = {
			message: 'Не удалось обновить статус. Попробуйте еще раз.',
		}
		throw error
	}

    return {
        id,
        status,
        updatedAt: new Date().toISOString()
    }
}
