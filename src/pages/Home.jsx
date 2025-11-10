import BrandHeading from '../components/BrandHeading.jsx'
import Paragraph from '../components/Paragraph.jsx'
import ModelGrid from '../components/ModelGrid.jsx'
import Button from '../components/Button.jsx'
import Slider from '../components/Slider.jsx'
import { useEffect, useState } from 'react'
import { api } from '../lib/api.js'
import { SkeletonGrid } from '../components/Skeleton.jsx'

export default function Home() {
  const [items, setItems] = useState(null)

  useEffect(() => {
    let mounted = true
    api('/models/latest').then(d => { if (mounted) setItems(d) }).catch(()=> setItems([]))
    return () => { mounted = false }
  }, [])

  return (
    <>
      <section className="pt-10 pb-8 space-y-4">
        <BrandHeading>Forge your AI model catalog</BrandHeading>
        <Paragraph>Curate, manage, and track purchases with a beautiful, responsive UI.</Paragraph>
        <div className="mt-6 flex gap-3">
          <a href="/models" className="btn-ghost">Browse Models</a>
          <Button>Get Started</Button>
        </div>
      </section>

      <section className="py-6 space-y-4">
        <h2 className="h2">What you get</h2>
        <Slider />
      </section>

      <section className="py-6">
        <div className="flex items-end justify-between">
          <h2 className="h2">Newest Models</h2>
          <a className="btn-ghost" href="/models">See all</a>
        </div>
        <div className="mt-6">
          {items === null ? <SkeletonGrid count={6} /> : <ModelGrid items={items} />}
        </div>
      </section>
    </>
  )
}
