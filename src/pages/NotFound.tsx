export default function NotFound() {
	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='flex flex-col items-center p-4'>
				<h1 className='text-3xl lg:text-8xl font-bold'>404</h1>
				<p className="text-lg lg:text-2xl">NotFound</p>
				<p className="mt-4 text-xl text-center">
					Извините но данной страницы не существует, попробуйте позже или
					обратитесь к администратору
				</p>
			</div>
		</div>
	)
}
