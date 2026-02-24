import { searchBook } from '@/api/api'
import ListItem from '@/components/ListItem'
import ListPagination from '@/components/ListPagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { DEFAULT_SEARCH_DATA, PAGE_SIZE } from '@/consistent/consistent'
import { useQuery } from '@tanstack/react-query'
import { BookOpen, Search } from 'lucide-react'
import { useState } from 'react'

const SearchPage = () => {
	// 검색 상태 플래그
	const [state, setState] = useState<{ mode: 'global' | 'detail'; keyword: string }>({
		mode: 'global',
		keyword: '',
	})
	// 통합 검색 input value
	const [globalInput, setGlobalInput] = useState<string>('')
	// 상세 검색 input value
	const [detailInput, setDetailInput] = useState<string>('')
	// 상세 검색 항목
	const [target, setTarget] = useState<string>('title')
	// 페이지
	const [page, setPage] = useState<number>(1)

	const { data: searchData = DEFAULT_SEARCH_DATA, refetch } = useQuery({
		queryKey: ['search', state.keyword, page],
		queryFn: () =>
			searchBook({
				query: state.keyword,
				target: state.mode === 'global' ? undefined : target,
				page,
				size: PAGE_SIZE,
			}),
		select: ({ data }) => ({
			meta: data.meta,
			documents: data.documents,
		}),
		placeholderData: prev => prev,
		enabled: !!state.keyword,
	})

	const handleGlobalInput = () => {
		setState({
			mode: 'global',
			keyword: globalInput.trim(),
		})
		setDetailInput('')
		setTarget('title')
	}

	const handleDetailInput = () => {
		setState({
			mode: 'detail',
			keyword: detailInput.trim(),
		})
		setGlobalInput('')
		refetch()
	}

	return (
		<div className="flex flex-col gap-6 h-full min-h-0">
			<h3 className="shrink-0">도서 검색</h3>

			<div className="flex items-center gap-4 shrink-0">
				<div className="flex flex-1 justify-between items-center border rounded-4xl">
					<Search />

					<Input
						type="text"
						placeholder="검색어를 입력하세요."
						className="border-none outline-none shadow-none bg-none transition-none focus-visible:ring-0"
						value={globalInput}
						onChange={e => setGlobalInput(e.target.value)}
						onKeyDown={e => {
							if (e.key === 'Enter') handleGlobalInput()
						}}
					/>
				</div>

				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline">상세 검색</Button>
					</PopoverTrigger>

					<PopoverContent align="end">
						<div className="flex flex-col gap-2">
							<div className="flex gap-2">
								<Select defaultValue="title" onValueChange={value => setTarget(value)}>
									<SelectTrigger className="w-24">
										<SelectValue placeholder="검색 항목" />
									</SelectTrigger>

									<SelectContent>
										<SelectGroup>
											<SelectItem value="title">제목</SelectItem>
											<SelectItem value="person">저자명</SelectItem>
											<SelectItem value="publisher">출판사</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>

								<Input
									type="text"
									className="flex-1"
									placeholder="검색어 입력"
									value={detailInput}
									onChange={e => setDetailInput(e.target.value)}
								/>
							</div>

							<Button onClick={handleDetailInput}>검색하기</Button>
						</div>
					</PopoverContent>
				</Popover>
			</div>

			<p className="shrink-0">
				도서 검색 결과 총<span className="text-primary">{searchData.meta.total_count}</span>건
			</p>

			{!searchData.documents.length ? (
				<div className="flex flex-col flex-1 gap-4 justify-center items-center min-h-0">
					<BookOpen size="60" />

					<p>검색된 결과가 없습니다.</p>
				</div>
			) : (
				<div className="flex flex-col gap-6 flex-1 min-h-0">
					<div className="flex flex-col flex-1 overflow-y-auto">
						{searchData.documents.map(item => (
							<ListItem data={item} />
						))}
					</div>

					<ListPagination
						totalCount={searchData.meta.total_count}
						isEnd={searchData.meta.is_end}
						page={page}
						setPage={setPage}
					/>
				</div>
			)}
		</div>
	)
}

export default SearchPage
