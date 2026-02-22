import { Header } from '@/components/Header'
import { Outlet } from 'react-router'

function App() {
	return (
		<div className="bg-white shadow-md h-full rounded-2xl md:max-w-6xl mx-auto">
			<Header />

			<div className="p-10">
				<Outlet />
			</div>
		</div>
	)
}

export default App
