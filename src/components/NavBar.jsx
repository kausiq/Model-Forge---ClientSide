import { Link, NavLink } from 'react-router-dom'
import XIcon from './XIcon.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function NavBar() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-brand-bg/70 backdrop-blur-md border-b border-white/10">
      <nav className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="Model Forge" className="nav-logo" />
          <span className="h1 text-white text-2xl md:text-3xl leading-none">Model Forge</span>
        </Link>

        <div className="flex items-center gap-2">
          <NavLink to="/models" className="btn-ghost">Models</NavLink>
          {user && (
            <>
              <NavLink to="/add-model" className="btn">Add</NavLink>
              <NavLink to="/me/models" className="btn-ghost">My Models</NavLink>
              <NavLink to="/me/purchases" className="btn-ghost">My Purchases</NavLink>
            </>
          )}
          {!user ? (
            <>
              <NavLink to="/login" className="btn-ghost">Log in</NavLink>
              <NavLink to="/register" className="btn">Sign up</NavLink>
            </>
          ) : (
            <button className="btn-danger" onClick={logout}>Logout</button>
          )}
          <a href="https://x.com/" className="btn-ghost" aria-label="X">
            <XIcon className="h-5 w-5" />
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
