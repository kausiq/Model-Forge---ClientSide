import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../lib/api.js'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import BrandHeading from '../components/BrandHeading.jsx'
import Paragraph from '../components/Paragraph.jsx'
import { SkeletonLine } from '../components/Skeleton.jsx'
import toast from 'react-hot-toast'

export default function ModelDetails() {
  const { id } = useParams()
  const [model, setModel] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const nav = useNavigate()

  useEffect(() => {
    setLoading(true)
    api(`/models/${id}`).then(setModel).finally(()=>setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="skeleton w-full aspect-video rounded-2xl" />
        <SkeletonLine h={28} w="40%" />
        <SkeletonLine h={16} />
        <SkeletonLine h={16} w="80%" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="card"><SkeletonLine h={18} w="60%" /></div>
          <div className="card"><SkeletonLine h={18} w="60%" /></div>
          <div className="card"><SkeletonLine h={18} w="60%" /></div>
        </div>
        <div className="flex gap-3">
          <div className="skeleton" style={{ height: 40, width: 120 }} />
          <div className="skeleton" style={{ height: 40, width: 160 }} />
        </div>
      </div>
    )
  }

  if (!model) return <div>Not found</div>
  const isOwner = user?.email === model.createdBy

  const purchase = async () => {
    const p = api(`/models/${id}/purchase`, { method: 'POST' })
    toast.promise(p, { loading: 'Purchasing…', success: 'Purchased!', error: 'Failed to purchase' })
    const updated = await p
    setModel(updated)
  }
  const del = async () => {
    if (!confirm('Delete this model?')) return
    const r = api(`/models/${id}`, { method: 'DELETE' })
    toast.promise(r, { loading: 'Deleting…', success: 'Deleted', error: 'Failed to delete' })
    await r
    nav('/models')
  }

  return (
    <div className="space-y-5">
      <img src={model.image} alt={model.name} className="w-full rounded-2xl aspect-video object-cover" />
      <BrandHeading>{model.name}</BrandHeading>
      <Paragraph>{model.description}</Paragraph>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div className="card"><strong>Framework:</strong> {model.framework}</div>
        <div className="card"><strong>Use Case:</strong> {model.useCase}</div>
        <div className="card"><strong>Dataset:</strong> {model.dataset}</div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={purchase}>Purchase</Button>
        <span className="text-sm opacity-80">Purchased {model.purchased ?? 0} times</span>
        {isOwner && (
          <>
            <Link to={`/update-model/${model._id}`} className="btn-ghost">Edit</Link>
            <button onClick={del} className="btn-danger">Delete</button>
          </>
        )}
      </div>
    </div>
  )
}
