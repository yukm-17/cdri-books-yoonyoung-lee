interface CountDescriptionProps {
	title: string
	count: number
}

const CountDescription = ({ title, count }: CountDescriptionProps) => {
	return (
		<p className="shrink-0">
			{title} 총 <span className="font-bold text-primary">{count}</span>건
		</p>
	)
}

export default CountDescription
