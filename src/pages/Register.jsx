import BrandHeading from '../components/BrandHeading.jsx'
import Paragraph from '../components/Paragraph.jsx'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Register() {
  const { registerEmail } = useAuth()
  const [name, setName] = useState('')
  const [photo, setPhoto] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()
  const loc = useLocation()

  const submit = async (e) => {
    e.preventDefault()
    const p = registerEmail(name, email, password, photo)
    toast.promise(p, { loading: 'Creating account…', success: 'Account created', error: 'Register failed' })
    await p
    nav((loc.state && loc.state.from) || '/', { replace: true })
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <BrandHeading>Create an account</BrandHeading>
      <Paragraph>Use a valid email and a strong password.</Paragraph>
      <form onSubmit={submit} className="space-y-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-white/20"/>
        <input value={photo} onChange={e=>setPhoto(e.target.value)} placeholder="Photo URL"
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-white/20"/>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email"
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-white/20"/>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password"
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-white/20"/>
        <Button type="submit" className="w-full">Register</Button>
      </form>
      <p className="p">Already have an account? <Link to="/login" className="underline">Log in</Link></p>
    </div>
  )
}
