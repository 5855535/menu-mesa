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

  return (
    <article
      ref={cardRef}
      style={style}
      className={`
        group relative bg-slate-900 rounded-2xl overflow-hidden
        border border-slate-800
        transition-all duration-300 ease-out
        hover:border-brand-600 hover:shadow-2xl hover:shadow-brand-600/20 hover:-translate-y-1
        focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2 focus-within:ring-offset-black
        opacity-0 translate-y-4
        animate-in opacity-100 translate-y-0
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
    >
      {/* IMAGE SECTION */}
      <div className="relative aspect-square overflow-hidden bg-slate-950">
        {/* Loading Shimmer */}
        {imageLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-[length:200%_100%] animate-shimmer z-10" />
        )}

        {/* Product Image */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className={`
              w-full h-full object-cover
              transition-all duration-500 ease-out
              group-hover:scale-105
              ${imageLoading ? 'opacity-0' : 'opacity-100'}
            `}
            onLoad={onImageLoad}
            onError={onImageError}
            loading="lazy"
          />
        ) : imageError ? (
          <div className="flex items-center justify-center h-full w-full bg-slate-950 text-slate-500">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-slate-950">
            <svg className="w-16 h-16 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Category Badge */}
        {product.category && (
          <span className="absolute top-3 left-3 px-3 py-1.5 text-xs font-bold text-white bg-brand-600 rounded-full">
            {product.category}
          </span>
        )}

        {/* Availability Overlay */}
        {product.isAvailable === false && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
            <span className="px-4 py-2.5 text-sm font-bold text-white bg-red-600 rounded-lg">
              No disponible
            </span>
          </div>
        )}
      </div>

      {/* CONTENT SECTION */}
      <div className="p-5 space-y-3 flex flex-col flex-1">

        {/* Title */}
        <div>
          <h3 className="text-lg font-bold text-amber-400 leading-tight uppercase tracking-wide">
            {product.name}
          </h3>
        </div>

        {/* Description */}
        {product.description && (
          <div>
            <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
              {product.description}
            </p>
          </div>
        )}

        {/* Footer: Price + Button */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800 mt-auto">
          <div>
            <span className="text-xl font-bold text-amber-400 tabular-nums">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            type="button"
            className={`
              px-4 py-2.5 text-xs font-bold text-black bg-white rounded-lg
              transition-all duration-200 ease-out
              hover:bg-gray-100 hover:shadow-lg
              active:scale-[0.97]
              focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 focus:ring-offset-black
              disabled:opacity-50 disabled:cursor-not-allowed
              ${product.isAvailable === false ? 'opacity-60 cursor-not-allowed' : ''}
              uppercase tracking-widest font-black
            `}
            disabled={product.isAvailable === false}
            aria-label={`Agregar ${product.name} al pedido`}
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  )
}
