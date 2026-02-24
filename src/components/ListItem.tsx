import ItemPrice from '@/components/ItemPrice'
import ItemThumbnail from '@/components/ItemThumbnail'
import { Button } from '@/components/ui/button'
import { useWishiListStore } from '@/stores/useWishiListStore'
import type { Document } from '@/types/types'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { useShallow } from 'zustand/shallow'

type ListItemProps = { data: Document }

const ListItem = ({ data }: ListItemProps) => {
	const { thumbnail, title, authors, sale_price, price, contents, url, isbn } = data

	const [open, setOpen] = useState<Boolean>(false)

	const { wishList, setWishList, removeWishList } = useWishiListStore(
		useShallow(state => ({
			wishList: state.wishList.documents,
			setWishList: state.setWishList,
			removeWishList: state.removeWishList,
		})),
	)

	const isWished = !!wishList.filter(item => item.isbn === isbn).length

	return (
		<div className={`${!open ? 'px-4 py-5' : 'px-4 py-8'} border-t border-t-zinc-200`}>
			{!open ? (
				<div className="flex gap-6">
					<ItemThumbnail
						src={thumbnail}
						isWished={isWished}
						size="sm"
						onClick={() => (isWished ? removeWishList(isbn) : setWishList(data))}
					/>

					<div className="flex flex-1 gap-2 justify-between items-center">
						<div className="flex gap-2 items-center">
							<h4 className="w-96 text-lg font-bold break-keep leading-5">{title}</h4>

							<p className="break-keep leading-5 text-zinc-500">{authors.join(', ')}</p>
						</div>

						<ItemPrice price={price} salePrice={sale_price} size="sm" />
					</div>

					<div className="flex gap-2 items-center">
						<Button asChild>
							<a href={url} target="_blank">
								구매하기
							</a>
						</Button>
						<Button variant="outline" onClick={() => setOpen(prev => !prev)}>
							상세보기
							<ChevronDown />
						</Button>
					</div>
				</div>
			) : (
				<div className="flex gap-10">
					<ItemThumbnail
						src={thumbnail}
						isWished={isWished}
						onClick={() => (isWished ? removeWishList(isbn) : setWishList(data))}
					/>

					<div className="flex flex-col flex-1 gap-4">
						<div className="flex flex-col gap-1">
							<h4 className="text-xl font-bold break-keep leading-5">{title}</h4>

							<p className="text-zinc-500">{authors.join(', ')}</p>
						</div>

						<p className="font-bold">책 소개</p>

						<p className="break-keep">{contents}</p>
					</div>

					<div className="flex flex-col w-56 justify-between items-end">
						<Button variant="outline" onClick={() => setOpen(prev => !prev)}>
							상세보기
							<ChevronUp />
						</Button>

						<div className="flex flex-col gap-4 w-full items-end">
							<ItemPrice price={price} salePrice={sale_price} />

							<Button size="lg" className="w-full" asChild>
								<a href={url} target="_blank">
									구매하기
								</a>
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ListItem
