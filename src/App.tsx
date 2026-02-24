import { Header } from '@/components/Header'
import { Outlet } from 'react-router'

function App() {
	return (
		<div className="flex flex-col bg-white shadow-md h-full rounded-2xl md:max-w-6xl mx-auto overflow-hidden min-h-0">
			<Header />

			<div className="p-10 min-h-0 h-full">
				<Outlet />
			</div>
		</div>
	)
}

export default App
