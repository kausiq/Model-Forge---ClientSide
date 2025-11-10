export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" className="nav-logo" />
          <span className="text-slate-300">© {new Date().getFullYear()} Model Forge</span>
        </div>
        <div className="text-slate-400 text-sm">
          Built with React • Tailwind • Firebase
        </div>
      </div>
    </footer>
  )
}
