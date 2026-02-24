import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { PAGE_SIZE } from '@/consistent/consistent'
import type { Dispatch } from 'react'

interface ListPaginationProps {
	totalCount: number
	isEnd: boolean
	page: number
	setPage: Dispatch<React.SetStateAction<number>>
}

const ListPagination = ({ totalCount, isEnd, page, setPage }: ListPaginationProps) => {
	const totalPages = Math.ceil(totalCount / PAGE_SIZE)

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => {
							if (page === 1) return

							setPage(page => Math.max(page - 1, 1))
						}}
						aria-disabled={page === 1}
						className={page === 1 ? 'pointer-events-none' : 'cursor-pointer'}
					/>
				</PaginationItem>

				{Array.from({ length: totalPages }).map((_, index) => {
					const pageNumber = index + 1

					return (
						<PaginationItem key={pageNumber}>
							<PaginationLink
								isActive={page === pageNumber}
								onClick={() => setPage(pageNumber)}
								className="cursor-pointer"
							>
								{pageNumber}
							</PaginationLink>
						</PaginationItem>
					)
				})}

				<PaginationItem>
					<PaginationNext
						onClick={() => {
							if (page === totalPages) return

							setPage(page => Math.max(page + 1, 1))
						}}
						aria-disabled={!isEnd}
						className={isEnd ? 'pointer-events-none' : 'cursor-pointer'}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}

export default ListPagination
