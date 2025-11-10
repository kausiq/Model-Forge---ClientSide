export default function FrameworkFilter({ value, onChange, options }) {
  const toggle = (fw) => onChange(value.includes(fw) ? value.filter(x=>x!==fw) : value.concat(fw))
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button key={opt}
          onClick={()=>toggle(opt)}
          className={`btn ${value.includes(opt) ? 'btn-primary' : 'btn-ghost'}`}>
          {opt}
        </button>
      ))}
    </div>
  )
}

