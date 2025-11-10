export default function SearchBox({ value, onChange, placeholder='Search…' }) {
  return (
    <input
      value={value}
      onChange={e=>onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-white/20"
    />
  )
}
