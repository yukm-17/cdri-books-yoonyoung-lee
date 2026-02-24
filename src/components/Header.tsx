import { NavLink } from 'react-router'

export const Header = () => {
	return (
		<header className="sticky px-8 py-6 top-0 z-50 border-b border-zinc-200">
			<div className="flex justify-between items-center">
				<NavLink to="/" className="font-bold text-2xl text-primary">
					Certicos Books
				</NavLink>

				<nav className="flex gap-6">
					<NavLink
						to="search"
						className={({ isActive }) => (isActive ? 'text-primary font-bold' : '')}
					>
						도서 검색
					</NavLink>
					<NavLink
						to="wishlist"
						className={({ isActive }) => (isActive ? 'text-primary font-bold' : '')}
					>
						내가 찜한 책
					</NavLink>
				</nav>
			</div>
		</header>
	)
}
