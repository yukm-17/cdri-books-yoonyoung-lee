import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ChevronDown } from 'lucide-react'
import { NavLink } from 'react-router'

export const Header = () => {
	return (
		<header className="sticky px-8 py-6 top-0 z-50 border-b border-zinc-200">
			<div className="flex justify-between items-center">
				<NavLink to="/" className="font-bold text-2xl text-primary">
					Certicos Books
				</NavLink>

				{/* PC 버전 메뉴 */}
				<nav className="md:flex md:gap-6 hidden">
					<NavLink to="search">도서 검색</NavLink>
					<NavLink to="wishlist">내가 찜한 책</NavLink>
				</nav>

				{/* 모바일 버전 드롭다운 메뉴 */}
				<Sheet>
					<SheetTrigger className="md:hidden">
						<ChevronDown />
					</SheetTrigger>

					<SheetContent side="top">
						<nav className="flex flex-col gap-6">
							<NavLink to="search">도서 검색</NavLink>
							<NavLink to="wishlist">내가 찜한 책</NavLink>
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	)
}
