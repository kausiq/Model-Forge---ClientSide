export function SkeletonLine({ h = 16, w = '100%' }) {
  return <div className="skeleton" style={{ height: h, width: w }} />
}

export function SkeletonCard() {
  return (
    <article className="card">
      <div className="skeleton card-img" />
      <div className="mt-4 flex-1 flex flex-col gap-3">
        <SkeletonLine h={22} w="70%" />
        <SkeletonLine h={14} />
        <SkeletonLine h={14} w="80%" />
        <div className="mt-auto flex gap-2">
          <div className="skeleton" style={{ height: 40, width: 96 }} />
          <div className="skeleton" style={{ height: 40, width: 120 }} />
        </div>
      </div>
    </article>
  )
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid-std">
      {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  )
}
