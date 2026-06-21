import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { VerdictBadge } from './VerdictBadge'

describe('VerdictBadge', () => {
	it('отображает текст вердикта ПОДХОДИТ', () => {
		render(<VerdictBadge verdict='ПОДХОДИТ' />)
		expect(screen.getByText('ПОДХОДИТ')).toBeInTheDocument()
	})

	it('применяет зелёный класс для вердикта ПОДХОДИТ', () => {
		render(<VerdictBadge verdict='ПОДХОДИТ' />)
		expect(screen.getByText('ПОДХОДИТ')).toHaveClass('text-green-600')
	})

	it('применяет оранжевый класс для вердикта ЧАСТИЧНО', () => {
		render(<VerdictBadge verdict='ЧАСТИЧНО' />)
		expect(screen.getByText('ЧАСТИЧНО')).toHaveClass('text-amber-600')
	})

	it('применяет красный класс для вердикта НЕ СООТВЕТСТВУЕТ', () => {
		render(<VerdictBadge verdict='НЕ СООТВЕТСТВУЕТ' />)
		expect(screen.getByText('НЕ СООТВЕТСТВУЕТ')).toHaveClass('text-red-600')
	})
})
