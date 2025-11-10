import Button from './Button.jsx'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ModelCard({ model, onPurchase }) {
  return (
    <motion.article
      className="card"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ translateY: -3 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      <img className="card-img" src={model.image} alt={model.name} />
      <div className="mt-4 flex-1 flex flex-col">
        <h3 className="h2 text-xl md:text-2xl">{model.name}</h3>
        <p className="p mt-2 line-clamp-3">{model.description}</p>
        <div className="mt-4 flex items-center gap-2 text-sm font-mono text-slate-300">
          <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">{model.framework}</span>
          <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">{model.useCase}</span>
        </div>
        <div className="mt-5 flex gap-2">
          <Link className="btn" to={`/models/${model._id}`}>View</Link>
          {onPurchase && <Button onClick={onPurchase}>Purchase</Button>}
        </div>
      </div>
    </motion.article>
  )
}

