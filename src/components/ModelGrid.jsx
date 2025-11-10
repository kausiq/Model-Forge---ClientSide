import ModelCard from './ModelCard.jsx'
export default function ModelGrid({ items, onPurchase }) {
  return (
    <div className="grid-std">
      {items.map(m => (
        <ModelCard key={m._id || m.name} model={m} onPurchase={onPurchase ? ()=>onPurchase(m) : undefined}/>
      ))}
    </div>
  )
}
