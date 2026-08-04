import { useState, useEffect, useRef } from 'react'
import { Product, formatPrice } from '../lib/firebase'

interface ProductCardProps {
  product: Product
  imageUrl?: string
  imageLoading?: boolean
  imageError?: Error | null
  onImageLoad?: () => void
  onImageError?: () => void
}

export function ProductCard({
  product,
  imageUrl,
  imageLoading,
  imageError,
  onImageLoad,
  onImageError,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const cardRef = useRef<HTMLArticleElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }
    return () => observer.disconnect()
  }, [])

  const description = product.description || ''
  const shouldTruncate = description.length > 120
  const displayDescription = showFullDescription || !shouldTruncate
    ? description
    : description.slice(0, 120).trimEnd() + '...'

  return (
    <article
      ref={cardRef}
      className={`
        group relative bg-white rounded-2xl overflow-hidden 
        shadow-sm border border-gray-100 
        transition-all duration-500 ease-out
        hover:shadow-xl hover:-translate-y-1
        focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2
        opacity-0 translate-y-4
        animate-in opacity-100 translate-y-0
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        {imageLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer" />
        )}
        
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className={`
              w-full h-full object-cover 
              transition-all duration-700 ease-out
              group-hover:scale-105
              ${imageLoading ? 'opacity-0' : 'opacity-100'}
            `}
            onLoad={onImageLoad}
            onError={onImageError}
            loading="lazy"
          />
        ) : imageError ? (
          <div className="flex items-center justify-center h-full w-full bg-gray-50 text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-50">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {product.category && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium text-white bg-black/60 backdrop-blur-sm rounded-full">
            {product.category}
          </span>
        )}

        {product.isAvailable === false && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="px-4 py-2 text-white font-medium bg-red-600 rounded-lg">
              No disponible
            </span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors duration-200">
          {product.name}
        </h3>

        {description && (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 transition-all duration-300">
            {displayDescription}
            {shouldTruncate && (
              <button
                type="button"
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="ml-1 text-xs font-medium text-orange-600 hover:text-orange-700 transition-colors"
                aria-expanded={showFullDescription}
                aria-controls={`desc-${product.id}`}
              >
                {showFullDescription ? ' menos' : ' más'}
              </button>
            )}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xl font-bold text-gray-900 tabular-nums">
            {formatPrice(product.price)}
          </span>
          
          <button
            type="button"
            className={`
              px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-xl
              transition-all duration-200 ease-out
              hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/30
              active:scale-[0.98]
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            disabled={product.isAvailable === false}
            aria-label={`Agregar ${product.name} al pedido`}
          >
            {product.isAvailable === false ? 'No disponible' : 'Agregar'}
          </button>
        </div>
      </div>

      <div 
        className={`
          absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500
          scale-x-0 origin-left group-hover:scale-x-100
          transition-transform duration-300 ease-out
        `}
        aria-hidden="true"
      />
    </article>
  )
}