function ProductCardSkeleton() {
  return (
    <article className="group relative bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-800">
      <div className="aspect-square bg-slate-950">
        <div className="w-full h-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-[length:200%_100%] animate-shimmer" />
      </div>
      <div className="p-5 space-y-3">
        <div className="space-y-2">
          <div className="h-6 w-3/4 bg-slate-800 rounded-lg" />
        </div>
        <div className="space-y-2.5">
          <div className="h-4 w-full bg-slate-800 rounded-lg" />
          <div className="h-4 w-5/6 bg-slate-800 rounded-lg" />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <div className="h-6 w-28 bg-slate-800 rounded-lg" />
          <div className="h-9 w-24 bg-slate-800 rounded-lg" />
        </div>
      </div>
    </article>
  )
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function CategorySkeleton() {
  return (
    <div className="flex flex-wrap gap-2 pb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-10 px-4 bg-gray-100 rounded-full animate-pulse" />
      ))}
    </div>
  )
}