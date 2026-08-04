import { Product } from '../lib/firebase'

interface MenuItemCardProps {
  product: Product
}

export function MenuItemCard({ product }: MenuItemCardProps) {
  return (
    <div
      className={`
        group flex gap-5 p-4 sm:p-5 bg-slate-900/70 rounded-xl border border-slate-700/50
        transition-all duration-300 ease-out
        hover:bg-slate-900 hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-400/10
        ${product.isAvailable === false ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {/* Imagen del producto */}
      {product.img && (
        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-slate-800">
          <img
            src={product.img}
            alt={product.nombre}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%231e293b%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%2394a3b8%22 font-size=%2214%22%3E?%3C/text%3E%3C/svg%3E'
            }}
          />
        </div>
      )}

      {/* Contenido */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        {/* Nombre y Precio */}
        <div className="mb-2">
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <h3 className="text-base sm:text-lg font-black text-amber-400 uppercase tracking-wide leading-tight">
              {product.nombre}
            </h3>
            <span className="text-base sm:text-lg font-bold text-amber-300 whitespace-nowrap flex-shrink-0">
              ${product.precio.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Descripción */}
        {product.desc && (
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-2 mb-3">
            {product.desc}
          </p>
        )}

        {/* Botón Agregar */}
        <button
          type="button"
          className={`
            px-4 py-1.5 sm:py-2 text-xs font-black text-black bg-amber-400
            rounded-lg transition-all duration-200 ease-out
            hover:bg-amber-300 hover:shadow-lg hover:-translate-y-0.5
            active:scale-[0.98]
            focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-900
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-400
            uppercase tracking-widest whitespace-nowrap self-start
          `}
          disabled={product.isAvailable === false}
          aria-label={`Agregar ${product.nombre}`}
        >
          {product.isAvailable === false ? 'No disponible' : 'Agregar'}
        </button>
      </div>
    </div>
  )
}
