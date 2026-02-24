import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
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

	const showPages = totalPages <= 5
	const showLeftEllipsis = !showPages && page > 3
	const showRightEllipsis = !showPages && page < totalPages - 2
	const isSinglePage = totalPages <= 1

	// 2 페이지부터(1은 고정) totalPages - 1 까지 노출 범위 설정
	// ex.totalPages 10, page 5 => start 4, end 6 => 4, 5, 6
	const start = showPages ? 2 : Math.max(2, Math.min(page - 1, totalPages - 3))
	const end = showPages ? totalPages - 1 : Math.min(totalPages - 1, start + 2)

	// 출력할 페이지 번호 배열
	const renderPages = showPages
		? Array.from({ length: Math.max(totalPages - 2, 0) }, (_, index) => index + 2)
		: Array.from({ length: end - start + 1 }, (_, index) => start + index)

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

					<PaginationItem>
						<PaginationLink
							isActive={page === 1}
							onClick={() => setPage(1)}
							className={isSinglePage ? 'pointer-events-none' : 'cursor-pointer'}
						>
							1
						</PaginationLink>
					</PaginationItem>

					{showLeftEllipsis && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}

					{renderPages.map(item => (
						<PaginationItem key={item}>
							<PaginationLink
								isActive={item === page}
								onClick={() => setPage(item)}
								className={isSinglePage ? 'pointer-events-none' : 'cursor-pointer'}
							>
								{item}
							</PaginationLink>
						</PaginationItem>
					))}

					{showRightEllipsis && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}

					{totalPages > 1 && (
						<PaginationItem>
							<PaginationLink
								isActive={page === totalPages}
								onClick={() => setPage(totalPages)}
								className={isSinglePage ? 'pointer-events-none' : 'cursor-pointer'}
							>
								{totalPages}
							</PaginationLink>
						</PaginationItem>
					)}

					<PaginationItem>
						<PaginationNext
							onClick={() => {
								if (page === totalPages) return

								setPage(page => Math.min(Math.max(page + 1, 1), totalPages))
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
