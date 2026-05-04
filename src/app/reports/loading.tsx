export default function LoadingReports() {
  return (
    <div className="space-y-6 fade-slide">
      <div className="flex items-center justify-between mb-4">
        <div className="h-7 w-32 bg-black/5 rounded-lg animate-pulse" />
        <div className="h-8 w-24 bg-black/5 rounded-full animate-pulse" />
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl bg-white p-4 shadow-card">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-5 w-40 bg-black/5 rounded-md animate-pulse" />
                <div className="h-4 w-24 bg-black/5 rounded-md animate-pulse" />
                <div className="h-4 w-3/4 bg-black/5 rounded-md animate-pulse mt-2" />
              </div>
              <div className="h-6 w-16 bg-black/5 rounded-full animate-pulse ml-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
