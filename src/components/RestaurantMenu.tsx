import { useMemo } from 'react'
import { Product } from '../lib/firebase'
import { MenuSection } from './MenuSection'
import { ProductGridSkeleton } from './Skeletons'

interface RestaurantMenuProps {
  products: Product[]
  loading: boolean
}

export function RestaurantMenu({ products, loading }: RestaurantMenuProps) {
  // Agrupar productos por categoría
  const groupedProducts = useMemo(() => {
    const grouped: Record<string, Product[]> = {}

    products.forEach((product) => {
      const category = product.categoria || 'Otros'
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(product)
    })

    return grouped
  }, [products])

  if (loading) {
    return <ProductGridSkeleton count={8} />
  }

  // Si no hay productos, mostrar mensaje
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold text-amber-400 mb-2">Menú vacío</h3>
        <p className="text-gray-400">Los productos aparecerán aquí cuando se agreguen a la base de datos.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
        <MenuSection
          key={category}
          title={category}
          items={categoryProducts}
          isLoading={false}
        />
      ))}
    </div>
  )
}
