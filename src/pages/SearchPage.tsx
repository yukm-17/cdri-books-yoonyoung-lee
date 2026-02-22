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
import { BookOpen, Search } from 'lucide-react'

const SearchPage = () => {
	return (
		<div className="flex flex-col gap-6">
			<h3>도서 검색</h3>

			<div className="flex items-center gap-4">
				<div className="flex flex-1 justify-between border rounded-4xl">
					<Button variant="ghost" size="icon">
						<Search />
					</Button>

					<Input
						type="text"
						placeholder="검색어를 입력하세요."
						className="border-none outline-none shadow-none bg-none transition-none focus-visible:ring-0"
					/>
				</div>

				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline">상세 검색</Button>
					</PopoverTrigger>

					<PopoverContent align="end">
						<div className="flex flex-col gap-2">
							<div className="flex gap-2">
								<Select defaultValue="title">
									<SelectTrigger className="w-24">
										<SelectValue placeholder="필터" />
									</SelectTrigger>

									<SelectContent>
										<SelectGroup>
											<SelectItem value="title">제목</SelectItem>
											<SelectItem value="writer">저자명</SelectItem>
											<SelectItem value="publisher">출판사</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>

								<Input type="text" className="flex-1" placeholder="검색어 입력" />
							</div>

							<Button>검색하기</Button>
						</div>
					</PopoverContent>
				</Popover>
			</div>

			<p>
				도서 검색 결과 총<span className="text-primary">0</span>건
			</p>

			<div className="flex flex-col gap-4 justify-center items-center">
				<BookOpen size="60" />

				<p>검색된 결과가 없습니다.</p>
			</div>
		</div>
	)
}

export default SearchPage
