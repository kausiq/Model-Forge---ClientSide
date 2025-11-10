import { auth } from './firebase.js'
const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5174/api'

export async function api(path, init = {}) {
  const token = await auth.currentUser?.getIdToken?.()
  const headers = new Headers(init.headers || {})
  headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)
  const res = await fetch(`${BASE}${path}`, { ...init, headers })
  if (!res.ok) {
    try { const j = await res.json(); throw new Error(j.message || 'Request failed') }
    catch { throw new Error('Request failed') }
  }
  return res.json()
}
