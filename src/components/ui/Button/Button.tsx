import React,  { type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'danger'
	size?: 'sm' | 'md' | 'lg'
}

export const Button: React.FC<ButtonProps> = ({
	children,
	className,
	...props
}: ButtonProps) => {
	return (
		<button
			className={`${className} px-5 py-2 rounded-lg cursor-pointer`}
			{...props}
		>
			{children}
		</button>
	)
}
