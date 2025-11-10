import BrandHeading from '../components/BrandHeading.jsx'
import Button from '../components/Button.jsx'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../lib/api.js'
import { SkeletonLine } from '../components/Skeleton.jsx'
import toast from 'react-hot-toast'

export default function UpdateModel() {
  const { id } = useParams()
  const nav = useNavigate()
  const [form, setForm] = useState(null)

  useEffect(() => { api(`/models/${id}`).then(setForm) }, [id])
  if (!form) {
    return (
      <div className="space-y-4">
        <BrandHeading>Edit Model</BrandHeading>
        <SkeletonLine h={44} />
        <SkeletonLine h={44} />
        <SkeletonLine h={120} />
      </div>
    )
  }
  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    const { _id, createdBy, createdAt, ...updates } = form
    const p = api(`/models/${id}`, { method: 'PUT', body: JSON.stringify(updates) })
    toast.promise(p, { loading: 'Saving…', success: 'Saved', error: 'Failed to save' })
    await p
    nav(`/models/${id}`)
  }

  return (
    <div className="space-y-4">
      <BrandHeading>Edit Model</BrandHeading>
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
        {['name','framework','useCase','dataset','image'].map((k) => (
          <label key={k} className="flex flex-col gap-2">
            <span className="text-slate-300 capitalize">{k}</span>
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
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  )
}
