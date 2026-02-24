import Heart from '@/assets/heart.svg'
import HeartOutline from '@/assets/heart_outline.svg'
import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'

interface ItemThumbnailProps {
	src: string
	isWished: boolean
	size?: 'sm' | 'md'
	onClick: () => void
}

const ItemThumbnail = ({ src, isWished = false, size = 'md', onClick }: ItemThumbnailProps) => {
	const width = size === 'sm' ? 'w-16' : 'w-44'
	const buttonIconSize = size === 'sm' ? 'w-6 h-6' : 'w-8 h-8'
	const thumbnailIconSize = size === 'sm' ? 20 : 34

	return (
		<div className={`relative ${width}`}>
			<div className="flex justify-end p-1 w-full h-full absolute">
				<Button variant="link" size="icon" className="cursor-pointer" onClick={onClick} asChild>
					<img src={isWished ? Heart : HeartOutline} className={buttonIconSize} />
				</Button>
			</div>

			{src ? (
				<img src={src} className="w-full" />
			) : (
				<div className="flex flex-col justify-center items-center w-full h-20 border border-zinc-200 text-zinc-300">
					<Info size={thumbnailIconSize} />
				</div>
			)}
		</div>
	)
}

export default ItemThumbnail
