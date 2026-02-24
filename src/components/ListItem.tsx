import { Button } from '@/components/ui/button'
import { useWishiListStore } from '@/stores/useWishiListStore'
import type { Document } from '@/types/types'
import { ChevronDown, ChevronUp, Heart, Info } from 'lucide-react'
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
					<div className="w-16 relative">
						<div className="absolute -bottom-3.5 -right-3.5">
							<Button
								variant="secondary"
								size="icon"
								className={`rounded-4xl ${isWished ? 'text-red-500' : 'text-zinc-400'}`}
								onClick={() => (isWished ? removeWishList(isbn) : setWishList(data))}
							>
								<Heart />
							</Button>
						</div>

						{thumbnail ? (
							<img src={thumbnail} className="w-full" />
						) : (
							<div className="flex flex-col justify-center items-center w-full h-28 border border-zinc-200 text-zinc-300">
								<Info size="20" />
							</div>
						)}
					</div>

					<div className="flex flex-1 gap-2 justify-between items-center">
						<div className="flex gap-2 items-center">
							<h4 className="w-96 text-lg font-bold break-keep leading-5">{title}</h4>

							<p className="break-keep leading-5 text-zinc-500">{authors.join(', ')}</p>
						</div>

						<h4 className="text-xl font-bold break-keep leading-5">
							{sale_price > 0 ? sale_price.toLocaleString() : price.toLocaleString()}원
						</h4>
					</div>

					<div className="flex gap-2 items-center">
						<Button asChild>
							<a href={url} target="_blank">
								구매하기
							</a>
						</Button>
						<Button variant="secondary" onClick={() => setOpen(prev => !prev)}>
							상세보기
							<ChevronDown />
						</Button>
					</div>
				</div>
			) : (
				<div className="flex gap-10">
					<div className="w-44 relative">
						<div className="absolute -bottom-3.5 -right-3.5">
							<Button
								variant="secondary"
								size="icon-lg"
								className={`rounded-4xl ${isWished ? 'text-red-500' : 'text-zinc-400'}`}
								onClick={() => (isWished ? removeWishList(isbn) : setWishList(data))}
							>
								<Heart />
							</Button>
						</div>

						{thumbnail ? (
							<img src={thumbnail} className="w-full" />
						) : (
							<div className="flex flex-col justify-center items-center w-full h-full border border-zinc-200 text-zinc-300">
								<Info size="34" />
							</div>
						)}
					</div>

					<div className="flex flex-col flex-1 gap-4">
						<div className="flex flex-col gap-1">
							<h4 className="text-xl font-bold break-keep leading-5">{title}</h4>

							<p className="text-zinc-500">{authors.join(', ')}</p>
						</div>

						<p className="font-bold">책 소개</p>

						<p className="break-keep">{contents}</p>
					</div>

					<div className="flex flex-col w-56 justify-between items-end">
						<Button variant="secondary" onClick={() => setOpen(prev => !prev)}>
							상세보기
							<ChevronUp />
						</Button>

						<div className="flex flex-col gap-4 w-full items-end">
							{sale_price > 0 ? (
								<div className="flex flex-col gap-2 items-end">
									<div className="flex gap-2 items-center">
										<span className="text-sm text-zinc-500">원가</span>

										<h4 className="text-2xl break-keep leading-5 line-through">
											{price.toLocaleString()}원
										</h4>
									</div>

									<div className="flex gap-2 items-center">
										<span className="text-sm text-zinc-500">할인가</span>

										<h4 className="text-2xl font-bold break-keep leading-5">
											{sale_price.toLocaleString()}원
										</h4>
									</div>
								</div>
							) : (
								<h4 className="text-2xl font-bold break-keep leading-5">
									{price.toLocaleString()}원
								</h4>
							)}

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
