import type { Verdict } from '../../../types/candidate'

const VERDICT_STYLES: Record<Verdict, string> = {
	ПОДХОДИТ: 'bg-green-300/20 text-green-600 border border-green-400/20',
	ЧАСТИЧНО: 'bg-orange-300/20 text-amber-600 border border-orange-300/20',
	'НЕ СООТВЕТСТВУЕТ': 'bg-red-300/20 text-red-600 border border-red-400/20',
}

interface VerdictBadgeProps {
	verdict: Verdict
}

export function VerdictBadge({ verdict }: VerdictBadgeProps) {
	return (
		<span
			className={`inline-flex items-center rounded-lg px-2 py-1 text-xs font-semibold whitespace-nowrap ${VERDICT_STYLES[verdict]}`}
		>
			{verdict}
		</span>
	)
}
