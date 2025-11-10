import { useEffect, useState } from 'react'
import ModelGrid from '../components/ModelGrid.jsx'
import BrandHeading from '../components/BrandHeading.jsx'
import SearchBox from '../components/SearchBox.jsx'
import FrameworkFilter from '../components/FrameworkFilter.jsx'
import useDebounce from '../hooks/useDebounce.js'
import { api } from '../lib/api.js'
import { SkeletonGrid } from '../components/Skeleton.jsx'
import toast from 'react-hot-toast'

export default function Models() {
  const [items, setItems] = useState(null)
  const [q, setQ] = useState('')
  const [frameworks, setFrameworks] = useState([])
  const dq = useDebounce(q, 300)

  useEffect(() => {
    setItems(null)
    const params = new URLSearchParams()
    if (dq) params.set('q', dq)
    if (frameworks.length) params.set('frameworks', frameworks.join(','))
    api(`/models?${params.toString()}`)
      .then(d => setItems(d.items))
      .catch(() => { setItems([]); toast.error('Failed to load models') })
  }, [dq, frameworks])

  return (
    <div className="space-y-6">
      <BrandHeading>All Models</BrandHeading>
      <div className="flex flex-col md:flex-row gap-3 items-stretch">
        <SearchBox value={q} onChange={setQ} placeholder="Search by model name…" />
        <FrameworkFilter value={frameworks} onChange={setFrameworks} options={['TensorFlow','PyTorch','JAX','ONNX']}/>
      </div>
      {items === null ? <SkeletonGrid count={9} /> : <ModelGrid items={items} />}
    </div>
  )
}
