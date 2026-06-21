import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StatusBadge } from './StatusBadge'

describe('StatusBadge', () => {
	it('отображает корректный текст для каждого статуса', () => {
		render(<StatusBadge status='new' />)
		expect(screen.getByText('Новый')).toBeInTheDocument()
	})

	it('показывает спиннер при isUpdating=true', () => {
		render(<StatusBadge status='review' isUpdating />)
		const badge = screen.getByText('На рассмотрении').parentElement
		expect(badge?.querySelector('.animate-spin')).toBeInTheDocument()
	})

	it('не показывает спиннер по умолчанию', () => {
		render(<StatusBadge status='review' />)
		const badge = screen.getByText('На рассмотрении').parentElement
		expect(badge?.querySelector('.animate-spin')).not.toBeInTheDocument()
	})
})
