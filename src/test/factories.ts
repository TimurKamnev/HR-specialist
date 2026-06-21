import type { Candidate } from '../types/candidate'

export function makeCandidate(overrides: Partial<Candidate> = {}): Candidate {
	return {
		id: 'test-id',
		name: 'Тестов Тест Тестович',
		position: 'react-middle',
		pos_label: 'React Middle',
		email: 'test@email.com',
		phone: '+996 000 000-000',
		city: 'Бишкек',
		tg: '@test',
		exp: [['2022-01 — н.в.', 'Company', 'Role', '1 г.']],
		total_exp: '~1 г.',
		stack: 'React',
		edu: 'Тест, 2020',
		verdict: 'ПОДХОДИТ',
		vc: 'verdict-green',
		criteria: [['ok', 'Тестовый критерий']],
		summary: 'Тестовое summary.',
		questions: ['Тестовый вопрос?'],
		status: 'new',
		createdAt: '2026-01-01T00:00:00Z',
		...overrides,
	}
}
