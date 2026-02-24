import BookIcon from '@/assets/icon_book.png'

interface NoResultsProps {
	children: string
}

const NoResults = ({ children }: NoResultsProps) => {
	return (
		<div className="flex flex-col flex-1 gap-4 justify-center items-center min-h-0">
			<img src={BookIcon} />

			<p>{children}</p>
		</div>
	)
}

export default NoResults
