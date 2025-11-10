import BrandHeading from '../components/BrandHeading.jsx'
import { useEffect, useState } from 'react'
import { api } from '../lib/api.js'
import { Link } from 'react-router-dom'
import { SkeletonGrid } from '../components/Skeleton.jsx'

export default function MyPurchases() {
  const [rows, setRows] = useState(null)
  useEffect(()=>{ api('/purchases/mine').then(setRows).catch(()=>setRows([])) }, [])

  if (rows === null) return <SkeletonGrid count={6} />

  return (
    <div className="space-y-6">
      <BrandHeading>My Purchases</BrandHeading>
      <div className="grid-std">
        {rows.map((r, idx) => (
          <article key={idx} className="card">
            <img src={r.model.image} className="card-img" />
            <h3 className="h2 text-xl md:text-2xl mt-3">{r.model.name}</h3>
            <p className="p mt-2">Purchased on {new Date(r.purchasedAt).toLocaleString()}</p>
            <div className="mt-auto">
              <Link to={`/models/${r.model._id}`} className="btn mt-4">View</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
