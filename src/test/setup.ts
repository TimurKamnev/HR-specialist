import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

class MockResizeObserver {
	callback: ResizeObserverCallback
	constructor(callback: ResizeObserverCallback) {
		this.callback = callback
	}
	observe(target: Element) {
		this.callback(
			[
				{
					target,
					contentRect: { height: 600, width: 800 },
				} as ResizeObserverEntry,
			],
			this,
		)
	}
	unobserve() {}
	disconnect() {}
}

vi.stubGlobal('ResizeObserver', MockResizeObserver)
