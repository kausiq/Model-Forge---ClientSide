import BrandHeading from '../components/BrandHeading.jsx'
import Paragraph from '../components/Paragraph.jsx'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { api } from '../lib/api.js'
import toast from 'react-hot-toast'

export default function AddModel() {
  const { user } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ name:'', framework:'', useCase:'', dataset:'', description:'', image:'' })
  const [busy, setBusy] = useState(false)

  const set = (k, v) => setForm(s => ({ ...s, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    const p = api('/models', { method: 'POST', body: JSON.stringify({ ...form, createdBy: user?.email }) })
    toast.promise(p, { loading: 'Creating…', success: 'Model created', error: 'Failed to create' })
    try {
      const created = await p
      nav(`/models/${created._id}`)
    } finally { setBusy(false) }
  }

  return (
    <div className="space-y-4">
      <BrandHeading>Add Model</BrandHeading>
      <Paragraph>Provide details and an image URL (e.g., ImgBB). Keep descriptions concise and clear.</Paragraph>

      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
        {[
          ['name','Name'],
          ['framework','Framework'],
          ['useCase','Use Case'],
          ['dataset','Dataset'],
          ['image','Image URL']
        ].map(([k, label]) => (
          <label key={k} className="flex flex-col gap-2">
            <span className="text-slate-300">{label}</span>
            <input required value={form[k]}
              onChange={e=>set(k, e.target.value)}
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-white/20"/>
          </label>
        ))}
        <label className="md:col-span-2 flex flex-col gap-2">
          <span className="text-slate-300">Description</span>
          <textarea required value={form.description} onChange={e=>set('description', e.target.value)}
            className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-white/20" rows={5}/>
        </label>
        <div className="md:col-span-2">
          <Button type="submit" disabled={busy}>Create</Button>
        </div>
      </form>
    </div>
  )
}