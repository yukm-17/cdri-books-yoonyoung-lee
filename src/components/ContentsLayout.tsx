import type { ReactNode } from 'react'

interface ContentsLayoutProps {
	title: string
	children: ReactNode
}

const ContentsLayout = ({ title, children }: ContentsLayoutProps) => {
	return (
		<div className="flex flex-col gap-4 h-full min-h-0 p-8">
			<h3 className="font-bold text-lg shrink-0">{title}</h3>

			{children}
		</div>
	)
}

export default ContentsLayout
