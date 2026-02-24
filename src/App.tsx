import { Header } from '@/components/Header'
import { Outlet } from 'react-router'

function App() {
	return (
		<div className="flex flex-col bg-white shadow-md h-full rounded-2xl md:max-w-6xl mx-auto overflow-hidden min-h-0">
			<Header />

			<Outlet />
		</div>
	)
}

export default App
