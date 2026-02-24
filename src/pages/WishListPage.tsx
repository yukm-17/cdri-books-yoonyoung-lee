import ContentsLayout from '@/components/ContentsLayout'
import CountDescription from '@/components/CountDescription'
import ListItem from '@/components/ListItem'
import ListWrap from '@/components/ListWrap'
import NoResults from '@/components/NoResults'
import { PAGE_SIZE } from '@/consistent/consistent'
import { useWishiListStore } from '@/stores/useWishiListStore'
import { useMemo, useState } from 'react'

const WishListPage = () => {
	const wishList = useWishiListStore(state => state.wishList)

	const [page, setPage] = useState<number>(1)

	const totalCount = wishList.meta.total_count
	const totalPages = totalCount > 0 ? Math.ceil(totalCount / PAGE_SIZE) : 1
	const isEnd = page >= totalPages

	const pages = useMemo(
		() => wishList.documents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
		[wishList.documents, page],
	)

	return (
		<ContentsLayout title="내가 찜한 책">
			<CountDescription title="찜한 책" count={totalCount} />

			{!wishList.documents.length ? (
				<NoResults>찜한 책이 없습니다.</NoResults>
			) : (
				<ListWrap totalCount={totalCount} isEnd={isEnd} page={page} setPage={setPage}>
					{pages.map(item => (
						<ListItem key={item.isbn} data={item} />
					))}
				</ListWrap>
			)}
		</ContentsLayout>
	)
}

export default WishListPage
