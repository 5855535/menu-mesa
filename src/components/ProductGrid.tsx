import { useState, useEffect, useCallback, useMemo } from 'react'
import { Product } from '../lib/firebase'
import { useProducts, useProductImage } from '../hooks/useProducts'
import { ProductCard } from './ProductCard'
import { ProductGridSkeleton } from './Skeletons'
import { EmptyState, ErrorState } from './States'

interface ProductGridProps {
  categoryId?: string | null
}

export function ProductGrid({ categoryId }: ProductGridProps) {
  const { products, loading, error } = useProducts(categoryId || undefined)
  const [imageStates, setImageStates] = useState<Record<string, { url: string | null; loading: boolean; error: Error | null }>>({})

  const productsWithImages = useMemo(() => 
    products.map((product) => ({
      ...product,
      imageState: imageStates[product.id] || { url: null, loading: true, error: null }
    })), [products, imageStates])

  useEffect(() => {
    const productIds = products.map(p => p.id)
    const currentIds = Object.keys(imageStates)
    
    const toRemove = currentIds.filter(id => !productIds.includes(id))
    const toAdd = productIds.filter(id => !currentIds.includes(id))

    if (toRemove.length > 0) {
      setImageStates(prev => {
        const next = { ...prev }
        toRemove.forEach(id => delete next[id])
        return next
      })
    }

    toAdd.forEach(productId => {
      const product = products.find(p => p.id === productId)
      if (product?.imagePath) {
        setImageStates(prev => ({
          ...prev,
          [productId]: { url: null, loading: true, error: null }
        }))
      } else {
        setImageStates(prev => ({
          ...prev,
          [productId]: { url: null, loading: false, error: null }
        }))
      }
    })
  }, [products])

  useEffect(() => {
    products.forEach(product => {
      if (product.imagePath && (!imageStates[product.id] || imageStates[product.id].loading)) {
        import('../lib/firebase').then(({ getProductImageUrl }) => {
          getProductImageUrl(product.imagePath!)
            .then(url => {
              setImageStates(prev => ({
                ...prev,
                [product.id]: { url, loading: false, error: null }
              }))
            })
            .catch(err => {
              setImageStates(prev => ({
                ...prev,
                [product.id]: { url: null, loading: false, error: err }
              }))
            })
        })
      }
    })
  }, [products, imageStates])

  if (loading) {
    return <ProductGridSkeleton count={6} />
  }

  if (error) {
    return <ErrorState onRetry={() => window.location.reload()} />
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No hay productos"
        description={categoryId 
          ? 'No se encontraron productos en esta categoría.' 
          : 'El menú está vacío. Agrega productos desde el panel de administración.'}
      />
    )
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7"
      role="list"
      aria-label="Productos del menú"
    >
      {productsWithImages.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          imageUrl={product.imageState.url || undefined}
          imageLoading={product.imageState.loading}
          imageError={product.imageState.error || undefined}
          style={{ animationDelay: `${index * 50}ms` } as React.CSSProperties}
        />
      ))}
    </div>
  )
}