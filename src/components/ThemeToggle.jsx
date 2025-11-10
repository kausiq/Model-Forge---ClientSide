import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)
  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark'); else root.classList.remove('dark')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored) setDark(stored === 'dark')
  }, [])
  return (
    <button className="btn-ghost" onClick={() => setDark(d=>!d)} aria-label="Toggle theme">
      {dark ? '🌙' : '☀️'}
    </button>
  )
}
