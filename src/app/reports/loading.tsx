export default function LoadingReports() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="h-20 rounded-2xl bg-black/5 animate-pulse" />
      ))}
    </div>
  )
}
