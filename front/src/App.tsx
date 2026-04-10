import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './component/Navbar'
import { Sidebar } from './component/Sidebar'
import Users from './pages/Users'
import Pets from './pages/Pets'
import Appointments from './pages/Appointments'
import Payments from './pages/Payments'
import { Toaster } from 'sonner'

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: '#1e1e38',
            border: '1px solid #ff69b4',
            color: '#fff',
          },
        }}
      />
      <div className="grid grid-cols-[16rem_1fr] grid-rows-[4rem_1fr] h-screen">
        <Navbar />
        <Sidebar />
        <main className="p-5 bg-[#1a1a2e]">
          <Routes>
            <Route path="/" element={<Appointments />} />
            <Route path="/users" element={<Users />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
