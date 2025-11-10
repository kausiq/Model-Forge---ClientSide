import BrandHeading from '../components/BrandHeading.jsx'
import ModelGrid from '../components/ModelGrid.jsx'
import { useEffect, useState } from 'react'
import { api } from '../lib/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { SkeletonGrid } from '../components/Skeleton.jsx'

export default function MyModels() {
  const [items, setItems] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    setItems(null)
    api('/models').then(d => {
      const mine = d.items.filter((x)=> x.createdBy === user?.email)
      setItems(mine)
    }).catch(()=> setItems([]))
  }, [user?.email])

  return (
    <div className="space-y-6">
      <BrandHeading>My Models</BrandHeading>
      {items === null ? <SkeletonGrid count={6} /> : <ModelGrid items={items} />}
    </div>
  )
}
