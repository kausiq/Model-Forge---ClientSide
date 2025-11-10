import { motion } from 'framer-motion'

export default function Button({ children, variant='primary', className='', ...rest }) {
  const base = 'btn'
  const map = { primary: 'btn-primary', ghost: 'btn-ghost', danger: 'btn-danger' }
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${map[variant]} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
