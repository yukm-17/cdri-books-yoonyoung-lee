import { searchBook } from '@/api/api'
import ContentsLayout from '@/components/ContentsLayout'
import CountDescription from '@/components/CountDescription'
import ListItem from '@/components/ListItem'
import ListWrap from '@/components/ListWrap'
import NoResults from '@/components/NoResults'
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
import { DEFAULT_SEARCH_DATA, PAGE_SIZE } from '@/constants/constants'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
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
			documents: data.documents.map(item => ({
				...item,
				contents: item.contents.trim() ? item.contents : '-',
			})),
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
		<ContentsLayout title="도서 검색">
			<div className="flex items-center gap-4 shrink-0">
				<div className="flex flex-1 justify-between items-center border rounded-4xl px-3">
					<Search className="text-muted" />

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

			<CountDescription title="도서 검색 결과" count={searchData.meta.total_count} />

			{!searchData.documents.length ? (
				<NoResults>검색된 결과가 없습니다.</NoResults>
			) : (
				<ListWrap
					totalCount={searchData.meta.total_count}
					isEnd={searchData.meta.is_end}
					page={page}
					setPage={setPage}
				>
					{searchData.documents.map(item => (
						<ListItem key={item.isbn} data={item} />
					))}
				</ListWrap>
			)}
		</ContentsLayout>
	)
}

export default SearchPage
