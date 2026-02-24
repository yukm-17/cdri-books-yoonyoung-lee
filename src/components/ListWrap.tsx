import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { PAGE_SIZE } from '@/consistent/consistent'
import { type Dispatch, type ReactNode } from 'react'

interface ListWrapProps {
	totalCount: number
	isEnd: boolean
	page: number
	setPage: Dispatch<React.SetStateAction<number>>
	children: ReactNode
}

const ListWrap = ({ totalCount, isEnd, page, setPage, children }: ListWrapProps) => {
	const totalPages = totalCount > 0 ? Math.ceil(totalCount / PAGE_SIZE) : 1

	return (
		<div className="flex flex-col gap-6 flex-1 min-h-0">
			<div className="flex flex-col flex-1 overflow-y-auto">{children}</div>

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
									className={totalPages <= 1 ? 'pointer-events-none' : 'cursor-pointer'}
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
							aria-disabled={isEnd}
							className={isEnd ? 'pointer-events-none' : 'cursor-pointer'}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}

export default ListWrap
