import ListItem from '@/components/ListItem'
import ListPagination from '@/components/ListPagination'
import { useWishiListStore } from '@/stores/useWishiListStore'
import { BookOpen } from 'lucide-react'
import { useState } from 'react'

const WishListPage = () => {
	const [page, setPage] = useState<number>(1)

	const wishList = useWishiListStore(state => state.wishList)

	return (
		<div className="flex flex-col gap-6 h-full min-h-0">
			<h3 className="shrink-0">내가 찜한 책</h3>

			<p className="shrink-0">
				찜한 책 총<span className="text-primary">{wishList.meta.total_count}</span>건
			</p>

			{!wishList.documents.length ? (
				<div className="flex flex-col flex-1 gap-4 justify-center items-center min-h-0">
					<BookOpen size="60" />

					<p>찜한 책이 없습니다.</p>
				</div>
			) : (
				<div className="flex flex-col gap-6 flex-1 min-h-0">
					<div className="flex flex-col flex-1 overflow-y-auto">
						{wishList.documents.map(item => (
							<ListItem data={item} />
						))}
					</div>

					<ListPagination
						totalCount={wishList.meta.total_count}
						isEnd={wishList.meta.is_end}
						page={page}
						setPage={setPage}
					/>
				</div>
			)}
		</div>
	)
}

export default WishListPage
