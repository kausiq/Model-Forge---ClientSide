import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        toastOptions={{
          style: { background: 'rgba(15,23,42,.95)', color: '#E5E7EB', border: '1px solid rgba(255,255,255,.08)' }
        }}
      />
    </div>
  )
}
