import { Product, formatPrice } from '../lib/firebase'

interface MenuItemCardProps {
  product: Product
}

export function MenuItemCard({ product }: MenuItemCardProps) {
  return (
    <div
      className={`
        group flex gap-4 p-4 bg-slate-900 rounded-lg border border-slate-800
        transition-all duration-200
        hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/10
        ${product.isAvailable === false ? 'opacity-60' : ''}
      `}
    >
      {/* Contenido principal */}
      <div className="flex-1 min-w-0">
        {/* Nombre y Precio en la misma línea */}
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <h3 className="text-lg font-black text-amber-400 uppercase tracking-wide">
            {product.nombre}
          </h3>
          <span className="text-lg font-bold text-white whitespace-nowrap">
            ${product.precio.toLocaleString()}
          </span>
        </div>

        {/* Descripción */}
        {product.desc && (
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
            {product.desc}
          </p>
        )}

        {/* Indicador de disponibilidad */}
        {product.isAvailable === false && (
          <p className="text-xs text-red-500 font-semibold mt-2">No disponible</p>
        )}
      </div>

      {/* Botón Agregar */}
      <div className="flex flex-col justify-center">
        <button
          type="button"
          className={`
            px-4 py-2 text-xs font-black text-black bg-amber-400
            rounded-lg transition-all duration-200
            hover:bg-amber-300 hover:shadow-lg
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-black
            disabled:opacity-50 disabled:cursor-not-allowed
            uppercase tracking-widest whitespace-nowrap
          `}
          disabled={product.isAvailable === false}
          aria-label={`Agregar ${product.nombre}`}
        >
          Agregar
        </button>
      </div>
    </div>
  )
}
