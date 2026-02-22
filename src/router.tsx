import App from '@/App'
import SearchPage from '@/pages/SearchPage'
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
				element: <div>wishlist</div>,
			},
		],
	},
])

export default router
