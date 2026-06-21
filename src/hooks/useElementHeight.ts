import { useCallback, useEffect, useState } from 'react'

export function useElementHeight<T extends HTMLElement>() {
	const [node, setNode] = useState<T | null>(null)
	const [height, setHeight] = useState(0)

	const ref = useCallback((el: T | null) => {
		setNode(el)
	}, [])

	useEffect(() => {
		if (!node) return

		const observer = new ResizeObserver(entries => {
			const entry = entries[0]
			if (entry) setHeight(entry.contentRect.height)
		})
		observer.observe(node)

		return () => observer.disconnect()
	}, [node])

	return { ref, height }
}
