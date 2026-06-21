const AVATAR_PALETTE: Array<{ bg: string; text: string }> = [
	{ bg: 'bg-blue-100', text: 'text-blue-700' },
	{ bg: 'bg-green-100', text: 'text-green-700' },
	{ bg: 'bg-orange-100', text: 'text-orange-700' },
	{ bg: 'bg-purple-100', text: 'text-purple-700' },
	{ bg: 'bg-pink-100', text: 'text-pink-700' },
	{ bg: 'bg-teal-100', text: 'text-teal-700' },
]

export function getInitials(fullName: string): string {
	return fullName
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map(part => part[0]?.toUpperCase() ?? '')
		.join('')
}

export function getAvatarColor(id: string): { bg: string; text: string } {
	const hash = id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
	return AVATAR_PALETTE[hash % AVATAR_PALETTE.length]
}
