import App from '@/App'
import SearchPage from '@/pages/SearchPage'
import WishListPage from '@/pages/WishListPage'
import { createBrowserRouter, Navigate } from 'react-router'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Navigate to="search" replace />,
			},
			{
				path: 'search',
				element: <SearchPage />,
			},
			{
				path: 'wishlist',
				element: <WishListPage />,
			},
		],
	},
])

export default router
