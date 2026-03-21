export default function ProductLoading() {
  return (
    <main className="min-h-screen bg-white pt-16 md:pt-20">
      <div className="px-4 md:px-8 lg:px-12 py-4">
        <div className="max-w-[1600px] mx-auto">
          <div className="h-4 w-32 bg-muted animate-pulse rounded" />
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-12 pb-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image skeleton */}
            <div>
              <div className="aspect-[3/4] bg-muted animate-pulse" />
              <div className="flex gap-3 mt-3">
                <div className="w-20 md:w-24 aspect-[3/4] bg-muted animate-pulse" />
                <div className="w-20 md:w-24 aspect-[3/4] bg-muted animate-pulse" />
              </div>
            </div>

            {/* Info skeleton */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="h-8 w-48 bg-muted animate-pulse rounded" />
              <div className="h-4 w-36 bg-muted animate-pulse rounded" />
              <div className="h-7 w-20 bg-muted animate-pulse rounded mt-2" />

              <div className="h-12 w-full bg-muted animate-pulse rounded mt-4" />

              <div className="flex gap-2 mt-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex-1 h-12 bg-muted animate-pulse rounded" />
                ))}
              </div>

              <div className="h-14 w-full bg-muted animate-pulse rounded mt-4" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
