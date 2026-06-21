import { getAvatarColor, getInitials } from '../../../utils/avatar'

interface AvatarProps {
	name: string
	id: string
}

export function Avatar({ name, id }: AvatarProps) {
	const color = getAvatarColor(id)

	return (
		<span
			className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm shrink-0 ${color.bg} ${color.text}`}
			aria-hidden='true'
		>
			{getInitials(name)}
		</span>
	)
}
