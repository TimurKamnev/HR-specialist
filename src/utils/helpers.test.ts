import { describe, expect, it } from 'vitest'
import {
	filterCandidates,
	parseExperienceYears,
	sortCandidates,
} from './helpers'
import { makeCandidate } from '../test/factories'

describe('filterCandidates', () => {
	const candidates = [
		makeCandidate({
			id: '1',
			name: 'Иванов Иван Иванович',
			verdict: 'ПОДХОДИТ',
			status: 'new',
		}),
		makeCandidate({
			id: '2',
			name: 'Петрова Анна Сергеевна',
			verdict: 'ЧАСТИЧНО',
			status: 'review',
		}),
		makeCandidate({
			id: '3',
			name: 'Сидоров Алексей Петрович',
			verdict: 'НЕ СООТВЕТСТВУЕТ',
			status: 'rejected',
		}),
	]

	it('возвращает всех кандидатов при verdict "all" и пустом поиске', () => {
		const result = filterCandidates(candidates, {
			search: '',
			verdict: 'all',
			status: 'all',
		})
		expect(result).toHaveLength(3)
	})

	it('фильтрует по конкретному вердикту', () => {
		const result = filterCandidates(candidates, {
			search: '',
			verdict: 'ЧАСТИЧНО',
			status: 'all',
		})
		expect(result).toHaveLength(1)
		expect(result[0].id).toBe('2')
	})

	it('фильтрует по статусу', () => {
		const result = filterCandidates(candidates, {
			search: '',
			verdict: 'all',
			status: 'rejected',
		})
		expect(result).toHaveLength(1)
		expect(result[0].id).toBe('3')
	})

	it('ищет по ФИО без учёта регистра', () => {
		const result = filterCandidates(candidates, {
			search: 'иванов',
			verdict: 'all',
			status: 'all',
		})
		expect(result).toHaveLength(1)
		expect(result[0].id).toBe('1')
	})

	it('игнорирует пробелы по краям поискового запроса', () => {
		const result = filterCandidates(candidates, {
			search: '  Петрова  ',
			verdict: 'all',
			status: 'all',
		})
		expect(result).toHaveLength(1)
		expect(result[0].id).toBe('2')
	})

	it('комбинирует поиск и фильтр по вердикту', () => {
		const result = filterCandidates(candidates, {
			search: 'Петрова',
			verdict: 'НЕ СООТВЕТСТВУЕТ',
			status: 'all',
		})
		expect(result).toHaveLength(0)
	})

	it('возвращает пустой массив, если ничего не подошло', () => {
		const result = filterCandidates(candidates, {
			search: 'Несуществующий',
			verdict: 'all',
			status: 'all',
		})
		expect(result).toEqual([])
	})

	it('не мутирует исходный массив', () => {
		const original = [...candidates]
		filterCandidates(candidates, {
			search: '',
			verdict: 'ПОДХОДИТ',
			status: 'all',
		})
		expect(candidates).toEqual(original)
	})
})

describe('parseExperienceYears', () => {
	it('извлекает число из строки с тильдой', () => {
		expect(parseExperienceYears('~3.5 г.')).toBe(3.5)
	})

	it('извлекает целое число лет', () => {
		expect(parseExperienceYears('~6 г.')).toBe(6)
	})

	it('возвращает 0 при нераспознанном формате', () => {
		expect(parseExperienceYears('нет данных')).toBe(0)
	})
})

describe('sortCandidates', () => {
	const candidates = [
		makeCandidate({
			id: '1',
			name: 'Б Кандидат',
			total_exp: '~2 г.',
			createdAt: '2026-01-02T00:00:00Z',
		}),
		makeCandidate({
			id: '2',
			name: 'А Кандидат',
			total_exp: '~5 г.',
			createdAt: '2026-01-01T00:00:00Z',
		}),
	]

	it('сортирует по имени по возрастанию', () => {
		const result = sortCandidates(candidates, 'name', 'asc')
		expect(result.map(c => c.id)).toEqual(['2', '1'])
	})

	it('сортирует по опыту по убыванию', () => {
		const result = sortCandidates(candidates, 'experience', 'desc')
		expect(result.map(c => c.id)).toEqual(['2', '1'])
	})

	it('не мутирует исходный массив', () => {
		const original = [...candidates]
		sortCandidates(candidates, 'name', 'asc')
		expect(candidates).toEqual(original)
	})
})
