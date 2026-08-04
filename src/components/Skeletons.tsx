function ProductCardSkeleton() {
  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="aspect-[4/3] bg-gray-100">
        <div className="w-full h-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer" />
      </div>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="h-6 w-3/4 bg-gray-200 rounded-lg" />
        </div>
        <div className="space-y-2.5">
          <div className="h-4 w-full bg-gray-100 rounded-lg" />
          <div className="h-4 w-5/6 bg-gray-100 rounded-lg" />
          <div className="h-4 w-4/5 bg-gray-100 rounded-lg" />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="h-6 w-28 bg-gray-200 rounded-lg" />
          <div className="h-9 w-24 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </article>
  )
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-7">
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