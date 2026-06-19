import {
	createContext,
	useCallback,
	useContext,
	useState,
	type ReactNode,
} from 'react'

type ToastVariant = 'success' | 'error'
interface ToastItem {
	id: number
	message: string
	variant: ToastVariant
}
interface ToastContextValue {
	showToast: (message: string, variant?: ToastVariant) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)
const AUTO_DISMISS_MS = 4000

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<ToastItem[]>([])

	const showToast = useCallback(
		(message: string, variant: ToastVariant = 'success') => {
			const id = Date.now() + Math.random()
			setToasts(prev => [...prev, { id, message, variant }])
			setTimeout(() => {
				setToasts(prev => prev.filter(t => t.id !== id))
			}, AUTO_DISMISS_MS)
		},
		[],
	)

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<div
				className='fixed bottom-4 right-4 flex flex-col gap-2 z-50'
				role='status'
				aria-live='polite'
			>
				{toasts.map(toast => (
					<div
						key={toast.id}
						className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white ${
							toast.variant === 'success' ? 'bg-green-600' : 'bg-red-600'
						}`}
					>
						{toast.message}
					</div>
				))}
			</div>
		</ToastContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast(): ToastContextValue {
	const ctx = useContext(ToastContext)
	if (!ctx) throw new Error('useToast must be used within ToastProvider')
	return ctx
}
