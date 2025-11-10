import BrandHeading from '../components/BrandHeading.jsx'
import Paragraph from '../components/Paragraph.jsx'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Login() {
  const { loginEmail, loginGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()
  const loc = useLocation()

  const submit = async (e) => {
    e.preventDefault()
    const p = loginEmail(email, password)
    toast.promise(p, { loading: 'Signing in…', success: 'Welcome back!', error: 'Login failed' })
    await p
    nav((loc.state && loc.state.from) || '/', { replace: true })
  }

  const onGoogle = async () => {
    const p = loginGoogle()
    toast.promise(p, { loading: 'Signing in with Google…', success: 'Welcome!', error: 'Google sign-in failed' })
    await p
    nav((loc.state && loc.state.from) || '/', { replace: true })
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <BrandHeading>Welcome back</BrandHeading>
      <Paragraph>Log in to continue.</Paragraph>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email"
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-white/20"/>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password"
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-white/20"/>
        <Button type="submit" className="w-full">Log in</Button>
        <button type="button" className="btn w-full" onClick={onGoogle}>Sign in with Google</button>
      </form>
      <p className="p">No account? <Link to="/register" className="underline">Register</Link></p>
    </div>
  )
}
