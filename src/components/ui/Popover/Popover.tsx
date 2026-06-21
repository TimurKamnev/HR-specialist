import { useEffect, useRef, useState } from 'react'

export default function Popover({
	trigger,
	children,
}: {
	trigger: (props: {
		ref: React.RefObject<HTMLButtonElement | null>
		onClick: () => void
	}) => React.ReactNode
	children: React.ReactNode
}) {
	const [open, setOpen] = useState(false)
	const triggerRef = useRef<HTMLButtonElement>(null)
	const popoverRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handler = (event: PointerEvent) => {
			const target = event.target as Node

			if (
				popoverRef.current?.contains(target) ||
				triggerRef.current?.contains(target)
			) {
				return
			}

			setOpen(false)
		}

		document.addEventListener('pointerdown', handler)

		return () => document.removeEventListener('pointerdown', handler)
	}, [])

	return (
		<div className='relative inline-block'>
			{trigger({
				ref: triggerRef,
				onClick: () => setOpen(v => !v),
			})}

			<div
				ref={popoverRef}
				data-state={open ? 'open' : 'closed'}
				className='
					absolute top-8 left-0 z-50 flex flex-col
					w-72 p-4 bg-white border rounded-lg shadow
					origin-top-left transition-all duration-200 gap-3

					data-[state=open]:opacity-100
					data-[state=open]:scale-100
					data-[state=open]:translate-y-0

					data-[state=closed]:opacity-0
					data-[state=closed]:scale-95
					data-[state=closed]:-translate-y-2
					data-[state=closed]:pointer-events-none
				'
			>
				{children}
			</div>
		</div>
	)
}
