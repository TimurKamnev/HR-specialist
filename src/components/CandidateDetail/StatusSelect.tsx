import type { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import {
	selectIsUpdatingStatus,
	updateCandidateStatusThunk,
} from '../../store/candidatesSlice'
import {
	STATUS_FLOW,
	STATUS_LABELS,
	type CandidateStatus,
} from '../../types/candidate'
import { useToast } from '../ui/Toast/Toast'

interface StatusSelectProps {
	candidateId: string
	currentStatus: CandidateStatus
}

export function StatusSelect({
	candidateId,
	currentStatus,
}: StatusSelectProps) {
	const dispatch = useAppDispatch()
	const { showToast } = useToast()
	const isUpdating = useAppSelector(selectIsUpdatingStatus(candidateId))

	async function handleChange(e: ChangeEvent<HTMLSelectElement>) {
		const nextStatus = e.target.value as CandidateStatus
		if (nextStatus === currentStatus) return

		try {
			await dispatch(
				updateCandidateStatusThunk({ id: candidateId, status: nextStatus }),
			).unwrap()
			showToast(`Статус изменён на «${STATUS_LABELS[nextStatus]}»`, 'success')
		} catch (err) {
			const message =
				err && typeof err === 'object' && 'message' in err
					? String((err as { message: unknown }).message)
					: 'Не удалось обновить статус'
			showToast(message, 'error')
		}
	}

	return (
		<div>
			<label
				htmlFor='candidate-status'
				className='block text-sm font-medium mb-1.5'
			>
				Статус кандидата
			</label>
			<select
				id='candidate-status'
				value={currentStatus}
				onChange={handleChange}
				disabled={isUpdating}
				className='border border-border rounded-lg py-2 px-3 w-full disabled:opacity-60'
			>
				{STATUS_FLOW.map(status => (
					<option key={status} value={status}>
						{STATUS_LABELS[status]}
					</option>
				))}
			</select>
		</div>
	)
}
