export default function NotFound() {
  return (
    <div className="min-h-[50vh] grid place-items-center">
      <div className="text-center space-y-3">
        <h1 className="h1">404</h1>
        <p className="p">The page you’re looking for does not exist.</p>
        <a href="/" className="btn">Go Home</a>
      </div>
    </div>
  )
}
