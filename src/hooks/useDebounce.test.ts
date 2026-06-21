import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
	it('возвращает начальное значение немедленно', () => {
		const { result } = renderHook(() => useDebounce('initial', 300))
		expect(result.current).toBe('initial')
	})

	it('не обновляет значение до истечения задержки', () => {
		vi.useFakeTimers()
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 300),
			{
				initialProps: { value: 'first' },
			},
		)

		rerender({ value: 'second' })
		expect(result.current).toBe('first')

		act(() => {
			vi.advanceTimersByTime(299)
		})
		expect(result.current).toBe('first')

		vi.useRealTimers()
	})

	it('обновляет значение после истечения задержки', () => {
		vi.useFakeTimers()
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 300),
			{
				initialProps: { value: 'first' },
			},
		)

		rerender({ value: 'second' })

		act(() => {
			vi.advanceTimersByTime(300)
		})
		expect(result.current).toBe('second')

		vi.useRealTimers()
	})

	it('применяет только последнее значение при быстрых последовательных изменениях', () => {
		vi.useFakeTimers()
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 300),
			{
				initialProps: { value: 'a' },
			},
		)

		// Имитация быстрого набора текста: "a" → "ab" → "abc" с интервалом меньше delay
		rerender({ value: 'ab' })
		act(() => {
			vi.advanceTimersByTime(100)
		})
		rerender({ value: 'abc' })
		act(() => {
			vi.advanceTimersByTime(100)
		})

		// Прошло 200мс суммарно, ни один таймер не успел отработать полностью
		expect(result.current).toBe('a')

		act(() => {
			vi.advanceTimersByTime(300)
		})
		expect(result.current).toBe('abc')

		vi.useRealTimers()
	})
})
