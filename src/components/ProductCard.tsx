import { useState, useEffect, useRef } from 'react'
import { Product, formatPrice } from '../lib/firebase'

interface ProductCardProps {
  product: Product
  imageUrl?: string
  imageLoading?: boolean
  imageError?: Error | null
  onImageLoad?: () => void
  onImageError?: () => void
  style?: React.CSSProperties
}

export function ProductCard({
  product,
  imageUrl,
  imageLoading,
  imageError,
  onImageLoad,
  onImageError,
  style,
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
      style={style}
      className={`
        group relative bg-white rounded-2xl overflow-hidden
        border border-gray-100
        transition-all duration-500 ease-out
        hover:border-brand-200 hover:shadow-xl hover:-translate-y-2
        focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2
        opacity-0 translate-y-4
        animate-in opacity-100 translate-y-0
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
    >
      {/* IMAGE SECTION */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Loading Shimmer */}
        {imageLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer z-10" />
        )}

        {/* Product Image */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className={`
              w-full h-full object-cover
              transition-all duration-700 ease-out
              group-hover:scale-110
              ${imageLoading ? 'opacity-0' : 'opacity-100'}
            `}
            onLoad={onImageLoad}
            onError={onImageError}
            loading="lazy"
          />
        ) : imageError ? (
          <div className="flex items-center justify-center h-full w-full bg-gray-50 text-gray-300">
            <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-50">
            <svg className="w-14 h-14 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Category Badge */}
        {product.category && (
          <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-semibold text-white bg-black/70 backdrop-blur-sm rounded-full transition-all duration-300 group-hover:bg-black/80">
            {product.category}
          </span>
        )}

        {/* Availability Overlay */}
        {product.isAvailable === false && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <span className="px-4 py-2.5 text-sm font-semibold text-white bg-red-600/90 rounded-lg shadow-lg">
              No disponible
            </span>
          </div>
        )}

        {/* Hover Accent Bar */}
        <div
          className={`
            absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-brand-600
            scale-x-0 origin-left group-hover:scale-x-100
            transition-transform duration-300 ease-out
          `}
          aria-hidden="true"
        />
      </div>

      {/* CONTENT SECTION */}
      <div className="p-6 space-y-4 flex flex-col flex-1">

        {/* Title */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-brand-600 transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
        </div>

        {/* Description */}
        {description && (
          <div className="flex-1">
            <p className="text-sm text-gray-600 leading-relaxed truncate-lines-3 transition-all duration-300">
              {displayDescription}
              {shouldTruncate && (
                <button
                  type="button"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="ml-1 text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline transition-colors"
                  aria-expanded={showFullDescription}
                  aria-controls={`desc-${product.id}`}
                >
                  {showFullDescription ? 'menos' : 'más'}
                </button>
              )}
            </p>
          </div>
        )}

        {/* Footer: Price + Button */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-100">
          <div className="flex-1">
            <span className="text-lg font-bold text-gray-900 tabular-nums">
              {formatPrice(product.price)}
            </span>
            <p className="text-xs text-gray-400 mt-0.5">Precio unitario</p>
          </div>

          <button
            type="button"
            className={`
              px-4 py-2.5 text-xs font-semibold text-white bg-brand-600 rounded-xl
              transition-all duration-200 ease-out
              hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/30 hover:-translate-y-0.5
              active:scale-[0.97]
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
              ${product.isAvailable === false ? 'opacity-60 cursor-not-allowed' : ''}
              uppercase tracking-wide
            `}
            disabled={product.isAvailable === false}
            aria-label={`Agregar ${product.name} al pedido`}
          >
            {product.isAvailable === false ? 'N/A' : 'Agregar'}
          </button>
        </div>
      </div>
    </article>
  )
}
