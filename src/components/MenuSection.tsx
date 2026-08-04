import { Product } from '../lib/firebase'
import { MenuItemCard } from './MenuItemCard'

interface MenuSectionProps {
  title: string
  items: Product[]
  isLoading?: boolean
}

export function MenuSection({ title, items, isLoading }: MenuSectionProps) {
  if (isLoading) {
    return (
      <div className="mb-12">
        <div className="h-8 w-48 bg-slate-800 rounded-lg mb-6 animate-pulse" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 bg-slate-800 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="mb-12">
      {/* Sección Title */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-amber-400 uppercase tracking-wider border-b-2 border-amber-400 pb-3 inline-block">
          {title}
        </h2>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {items.map((product) => (
          <MenuItemCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
