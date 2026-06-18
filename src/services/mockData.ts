import type { Candidate } from '../types/candidate'
import candidateRow from '../../mock/candidates.json'
import candidateLargeRow from '../../mock/candidates-large.json'

export const defaultCandidates = candidateRow as Candidate[]
export const largeCandidates = candidateLargeRow as Candidate[]

export type DataSource = 'default' | 'large'

export function getMockData(source: DataSource = 'default'): Candidate[] {
	const data = source === 'large' ? largeCandidates : defaultCandidates
	return data.map(candidate => ({ ...candidate }))
}
